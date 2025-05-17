import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  MutableRefObject,
  useLayoutEffect,
  useMemo,
  useState,
  useEffect,
} from "react";
import toast from "react-hot-toast";
import { UIMatch, useMatches } from "react-router-dom";
import { cartState, cartTotalState } from "@/state";
import {
  Cart,
  CartItem,
  Product,
  SelectedOptions,
  TemplateType,
} from "@/types";
import { getDefaultOptions, isIdentical } from "@/utils/cart";
import { getConfig, templateStorage } from "@/utils/template";
import { openChat, purchase } from "zmp-sdk";
import { createBrowserRouter } from "react-router-dom";

export function useRealHeight(
  element: MutableRefObject<HTMLDivElement | null>,
  defaultValue?: number
) {
  const [height, setHeight] = useState(defaultValue ?? 0);
  useLayoutEffect(() => {
    if (element.current && typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver((entries: ResizeObserverEntry[]) => {
        const [{ contentRect }] = entries;
        setHeight(contentRect.height);
      });
      ro.observe(element.current);
      return () => ro.disconnect();
    }
    return () => {};
  }, [element.current]);

  if (typeof ResizeObserver === "undefined") {
    return -1;
  }
  return height;
}

export function useAddToCart(product: Product, editingCartItemId?: number) {
  const [cart, setCart] = useAtom(cartState);
  const editing = useMemo(
    () => cart.find((item) => item.id === editingCartItemId),
    [cart, editingCartItemId]
  );

  const [options, setOptions] = useState<SelectedOptions>(
    editing ? editing.options : getDefaultOptions(product)
  );

  function handleReplace(quantity: number, cart: Cart, editing: CartItem) {
    if (quantity === 0) {
      // the user wants to remove this item.
      cart.splice(cart.indexOf(editing), 1);
    } else {
      const existed = cart.find(
        (item) =>
          item.id != editingCartItemId &&
          item.product.id === product.id &&
          isIdentical(item.options, options)
      );
      if (existed) {
        // there's another identical item in the cart; let's remove it and update the quantity in the editing item.
        cart.splice(cart.indexOf(existed), 1);
      }
      cart.splice(cart.indexOf(editing), 1, {
        ...editing,
        options,
        quantity: existed
          ? existed.quantity + quantity // updating the quantity of the identical item.
          : quantity,
      });
    }
  }

  function handleAppend(quantity: number, cart: Cart) {
    const existed = cart.find(
      (item) =>
        item.product.id === product.id && isIdentical(item.options, options)
    );
    if (existed) {
      // merging with another identical item in the cart.
      cart.splice(cart.indexOf(existed), 1, {
        ...existed,
        quantity: existed.quantity + quantity,
      });
    } else {
      // this item is new, appending it to the cart.
      cart.push({
        id: cart.length + 1,
        product,
        options,
        quantity,
      });
    }
  }

  const addToCart = (quantity: number) => {
    setCart((cart) => {
      const res = [...cart];
      if (editing) {
        handleReplace(quantity, res, editing);
      } else {
        handleAppend(quantity, res);
      }
      return res;
    });
  };

  return { addToCart, options, setOptions };
}

export function useCustomerSupport() {
  return () =>
    openChat({
      type: "oa",
      id: getConfig((config) => config.template.oaIDtoOpenChat),
    });
}

export function useToBeImplemented() {
  return () =>
    toast("Chức năng dành cho các bên tích hợp phát triển...", {
      icon: "🛠️",
    });
}

export function useCheckout() {
  const { totalAmount } = useAtomValue(cartTotalState);
  const setCart = useSetAtom(cartState);
  return async () => {
    try {
      await purchase({
        amount: totalAmount,
        desc: "Thanh toán đơn hàng",
        method: "",
      });
      toast.success("Thanh toán thành công. Cảm ơn bạn đã mua hàng!", {
        icon: "🎉",
      });
      setCart([]);
    } catch (error) {
      toast.error(
        "Thanh toán thất bại. Vui lòng kiểm tra nội dung lỗi bên trong Console."
      );
      console.warn(error);
    }
  };
}

export function useRouteHandle() {
  const matches = useMatches() as UIMatch<
    undefined,
    {
      title?: string;
      logo?: boolean;
      back?: boolean;
      scrollRestoration?: number;
    }
  >[];
  const lastMatch = matches[matches.length - 1];

  return [lastMatch.handle, lastMatch, matches] as const;
}

type RouterType = ReturnType<typeof createBrowserRouter>;

// const emptyRouter = createBrowserRouter([
//   {
//     path: "*",
//     element: "loading",
//   },
// ]);
//
export const useRouterTemplate = () => {
  const [routes, setRoutes] = useState<RouterType | null>(null);

  useEffect(() => {
    const loadRoutes = async () => {
      try {
        const storedTemplate = localStorage.getItem(
          templateStorage
        ) as TemplateType;

        const templateRouterMap: Record<
          TemplateType,
          () => Promise<{ router: RouterType }>
        > = {
          template1: () => import("@/templates/template1/router"),
          template2: () => import("@/templates/template2/router"),
          template3: () => import("@/templates/template3/router"),
        };

        const importer = templateRouterMap[storedTemplate];
        const { router } = await importer();

        setRoutes(router);
      } catch (error) {
        console.error("Failed to load template router", error);
      }
    };

    loadRoutes();
  }, []);

  return routes;
};
