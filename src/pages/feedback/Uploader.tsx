import { LucideLoader2, Plus } from 'lucide-react';
import { useRef, useState } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const [error, onError] = useState('');
  const [uploading, onUploading] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const handleClick = () => {
    ref.current?.click();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size > 5 * 1024 * 1024) {
        onError(t('feedback.errors.file_too_large'));
        return;
      }
      onError('');
      onUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        onUploading(false);
        setSelectedFile(reader.result as string);
      };
      reader.readAsDataURL(file);
      field.onChange(file);
    }
  };
  const handleRemove = () => {
    onError('');
    setSelectedFile('');
    field.onChange(null);
    if (ref.current) {
      ref.current.value = '';
    }
  };

  return (
    <FormItem className="mb-[28px]">
      <input
        type="file"
        ref={ref}
        accept=".jpg,.jpeg,.png"
        multiple={false}
        className="hidden"
        onChange={handleChange}
      />
      {error ? (
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
                onClick={handleRemove}
              >
                <FillCloseIcon />
              </Button>
            }
          >
            <ImgErrorIcon />
          </Badge>
          {error && (
            <p className="text-[14px] text-[#DA0000] mt-[8px]">{error}</p>
          )}
        </div>
      ) : field.value ? (
        <Badge
          visible
          rootClassName="size-[80px] rounded-[4px] flex flex-col items-center justify-center bg-[#F2F3F5]"
          slot={
            <Button
              size="icon"
              type="button"
              variant="ghost"
              className="size-[16px] h-auto w-auto hover:bg-transparent"
              onClick={handleRemove}
            >
              <FillCloseIcon />
            </Button>
          }
        >
          {selectedFile ? (
            <img
              src={selectedFile}
              className="rounded-[4px] size-full"
              alt="uploaded image"
            />
          ) : (
            <img
              src="logo.svg"
              className="rounded-[4px] size-full"
              alt="image"
            />
          )}
        </Badge>
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
          <span className="text-[14px] text-[#4E5969]">{t('feedback.form.upload_button')}</span>
        </Button>
      )}
      <FormMessage />
    </FormItem>
  );
}
