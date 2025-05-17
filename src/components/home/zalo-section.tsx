import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import headerLogoImage from "@/static/bookie-logo.svg";
import { followOfficalAccount } from "@/utils/zma";

export default function ZaloSection() {
  return (
    <div className="px-4 ">
      <Card className="border border-borderr">
        <CardContent className="p-3">
          <p className="text-xs"> Quan tâm Zalo OA để nhận các ưu đãi</p>
          <div className="w-full bg-[rgb(178,192,202)]/40 h-[1px] my-3"></div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="rounded-full">
                <img src={headerLogoImage} className="max-h-full flex-none" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Phòng khám Bookie</h4>
              </div>
            </div>
            <Button
              variant="default"
              className="bg-primary text-text text-xs px-3  h-auto rounded-full
             hover:bg-primary/80 active:bg-primary/70 transition-colors"
              onClick={() => followOfficalAccount()}
            >
              Quan tâm
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
