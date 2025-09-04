import { LucideLoader2, Plus } from 'lucide-react';
import { useRef, useState } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';

import { Badge } from '@/components/badge';
import { FillCloseIcon } from '@/components/icon/fill-close';
import { ImgErrorIcon } from '@/components/icon/img-error';
import { Button } from '@/components/ui/button';
import { FormItem, FormMessage } from '@/components/ui/form';

interface IProps {
  field: ControllerRenderProps<any, any>;
}

export function Uploader(props: IProps) {
  const { field } = props;
  const [error, onError] = useState(false);
  const [uploading, onUploading] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    ref.current?.click();
  };
  const handleChange = (e: {
    target: {
      files: unknown;
    };
  }) => {
    field.onChange(e.target.files);
  };

  return (
    <FormItem className="mb-[28px]">
      <input
        type="file"
        ref={ref}
        accept=".jpg,.png"
        className="hidden"
        onChange={handleChange}
      />
      {true ? (
        <div>
          <Badge
            visible
            rootClassName="size-[80px] rounded-[4px] flex flex-col items-center justify-center bg-[#F2F3F5]"
            slot={
              <Button
                size="icon"
                type="button"
                variant="ghost"
                className="size-[16px] h-auto w-auto hover:bg-transparent"
              >
                <FillCloseIcon />
              </Button>
            }
          >
            {error ? (
              <ImgErrorIcon />
            ) : (
              <img src="logo.svg" className="size-full" alt="image" />
            )}
          </Badge>
          {error && (
            <p className="text-[14px] text-[#DA0000] mt-[8px]">
              单个文件不超过 5MB
            </p>
          )}
        </div>
      ) : uploading ? (
        <div className="size-[80px] rounded-[4px] [&_svg]:size-[20px] flex flex-col items-center justify-center">
          <LucideLoader2 className="text-[#1167FE] animate-spin" />
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={handleClick}
          className="size-[80px] shadow-none [&_svg]:size-[20px]  flex flex-col items-center justify-center gap-1 p-0 rounded-[4px] border-[#E5E6EB] hover:border-[#C9CDD4] hover:bg-[#F2F3F5]"
        >
          <Plus className="size-[14px] text-[#4E5969]" />
          <span className="text-[14px] text-[#4E5969]">上传</span>
        </Button>
      )}
      <FormMessage />
    </FormItem>
  );
}
