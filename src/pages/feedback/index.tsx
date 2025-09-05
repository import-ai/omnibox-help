import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/components/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { http } from '@/lib/request';

import { Uploader } from './Uploader';

type FormData = {
  type: string;
  description: string;
  image?: File;
  contactInfo?: string;
};

export default function FeedbackForm() {
  const { t } = useTranslation();
  const [loading, onLoading] = useState(false);

  const formSchema = z.object({
    type: z.string().min(1, t('feedback.form.type_required')),
    description: z.string().min(1, t('feedback.form.description_required')),
    image: z.any().optional(),
    contactInfo: z.string().optional(),
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: '',
      image: null,
      description: '',
      contactInfo: '',
    },
  });
  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append('type', data.type);
    formData.append('description', data.description);
    if (data.contactInfo) {
      formData.append('contactInfo', data.contactInfo);
    }
    if (data.image) {
      formData.append('image', data.image);
    }
    onLoading(true);
    http
      .post('/feedback', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        form.reset({
          type: '',
          image: null,
          description: '',
          contactInfo: '',
        });
        toast(t('feedback.form.success_message'), { position: 'top-center' });
      })
      .finally(() => {
        onLoading(false);
      });
  };

  return (
    <div className="bg-[#F5F8FA] pb-10">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="size-8">
            <img src="logo.svg" alt="logo" />
          </div>
          <h1 className="text-xl font-medium text-gray-900">OmniBox</h1>
        </div>
      </div>
      <h2 className="text-[28px] font-medium text-center text-[#171717] mt-[18px] mb-[24px]">
        {t('feedback.title')}
      </h2>
      <div className="max-w-[628px] mx-auto bg-white rounded-[16px] py-[30px] px-[20px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="type"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mb-[28px]">
                  <FormLabel className="text-[16px] text-[#171717]">
                    <span className="text-red-500">*</span>{t('feedback.form.type_label')}
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="shadow-none w-full border-gray-200">
                        <SelectValue placeholder={t('feedback.form.type_placeholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="bug">{t('feedback.form.type_options.bug')}</SelectItem>
                      <SelectItem value="suggestion">{t('feedback.form.type_options.suggestion')}</SelectItem>
                      <SelectItem value="feature">{t('feedback.form.type_options.feature')}</SelectItem>
                      <SelectItem value="other">{t('feedback.form.type_options.other')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mb-[12px]">
                  <FormLabel className="text-[16px] text-[#171717]">
                    <span className="text-red-500">*</span>
                    {t('feedback.form.description_label')}
                  </FormLabel>
                  <p className="text-sm text-[#8F959E]">
                    {t('feedback.form.description_help')}
                  </p>
                  <FormControl>
                    <Textarea
                      placeholder={t('feedback.form.description_placeholder')}
                      className="shadow-none min-h-[120px] border-gray-200 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="image"
              control={form.control}
              render={({ field }) => <Uploader field={field} />}
            />
            <FormField
              name="contactInfo"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mb-[32px]">
                  <FormLabel className="text-[16px] text-[#171717]">
                    {t('feedback.form.contact_label')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('feedback.form.contact_placeholder')}
                      className="shadow-none border-gray-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={loading}
              loading={loading}
              className="w-full h-[36px] bg-black hover:bg-gray-800 text-white rounded-lg disabled:opacity-50"
            >
              {loading ? t('feedback.form.submitting') : t('feedback.form.submit')}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
