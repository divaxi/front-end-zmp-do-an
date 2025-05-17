export type TemplateType = "template1" | "template2" | "template3";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: Category;
  details?: Detail[];
  sizes?: Size[];
  colors?: Color[];
}

export interface Category {
  id: number;
  name: string;
  image: string;
}
export interface Treatment {
  id: string;
  name: string;
  image: string;
}

export interface Payment {
  id: string;
  date: string; // dd/mm format
  source: string;
  description: string;
  amount: number; // in VND
  status: "Đã thanh toán" | "Chưa thanh toán";
}

export interface Appointment {
  id: string;
  date: string;
  doctor: string;
  status: "Đã lấy số xếp hàng" | "Chưa gửi thông báo hẹn lịch";
}
export interface ServiceCategory {
  id: string;
  label: string;
}
export interface Service {
  id: string;
  label: string;
  image: string;
}

export interface ServiceDetail {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  paymentProcess: string[];
  offersAndExtraCharges: string[];
}

export interface NewsContentBlock {
  type: "heading" | "paragraph";
  text: string;
}

export interface NewsDetail {
  id: string;
  title: string;
  author: string;
  createdAt: string;
  viewCount: number;
  videoThumbnail: string;
  content: NewsContentBlock[];
}

export interface Detail {
  title: string;
  content: string;
}
export type Size = string;

export interface Color {
  name: string;
  hex: string;
}

export type SelectedOptions = {
  size?: Size;
  color?: Color["name"];
};

export interface CartItem {
  id: number;
  product: Product;
  options: SelectedOptions;
  quantity: number;
}

export type Cart = CartItem[];

export interface PatientData {
  Id?: string;
  Ten?: string;
  Sex?: number;
  DOB?: Date;
  CCCD?: string;
  Mobile?: string;
  ProvinceId?: string;
  DistrictId?: string;
  WardsId?: string;
  Address?: string;
  BHYT?: string;
  DanTocId?: string;
  NgheNghiepId?: string;
  NationalId?: string;
  CCCDNoiCap?: string;
  CCCDNgayCap?: Date;
  QRCode?: string;
  BHYTMaDKBD?: string;
  BHYTHieuLucTuNgay?: Date;
  BHYTHieuLucDenNgay?: Date;
  CanNang?: number;
  ChieuCao?: number;
}
