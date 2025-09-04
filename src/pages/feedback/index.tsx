import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
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

import { Uploader } from './Uploader';

const formSchema = z.object({
  type: z.string().min(1, '请选择反馈类型'),
  description: z.string().min(1, '请详细描述你遇到的问题'),
  files: z.any().refine(files => files?.length > 0, '请上传一个文件'),
  contact: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function FeedbackForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: '',
      files: null,
      description: '',
      contact: '',
    },
  });
  const onSubmit = (data: FormData) => {
    console.log(data);
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
        意见反馈
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
                    <span className="text-red-500">*</span>请选择你要反馈的类型?
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="shadow-none w-full border-gray-200">
                        <SelectValue placeholder="请选择" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="bug">BUG 问题</SelectItem>
                      <SelectItem value="request">投诉建议</SelectItem>
                      <SelectItem value="feature">功能请求</SelectItem>
                      <SelectItem value="other">其他</SelectItem>
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
                    请详细描述你遇到的问题?
                  </FormLabel>
                  <p className="text-sm text-[#8F959E]">
                    请提供详细的使用场景描述，必要截图，帮助我们准确理解需求，为你提供支持~
                  </p>
                  <FormControl>
                    <Textarea
                      placeholder="请输入"
                      className="shadow-none min-h-[120px] border-gray-200 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="files"
              control={form.control}
              render={({ field }) => <Uploader field={field} />}
            />
            <FormField
              name="contact"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mb-[32px]">
                  <FormLabel className="text-[16px] text-[#171717]">
                    请留下你的联系方式
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="请输入"
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
              className="w-full h-[36px] bg-black hover:bg-gray-800 text-white rounded-lg"
            >
              提交
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
