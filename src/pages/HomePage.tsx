import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { FormSchema } from '@/schema/formSchema';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Input,
  Textarea,
} from '@/components/ui';
import { toast } from '@/hooks/use-toast';
import { Layout } from '@/components/frame';

const HomePage = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      goal: '',
      description: '',
      subjects: [{ value: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'subjects',
  });

  // 제출 핸들러
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    toast({
      title: '작성하신 정보를 바탕으로 분석을 시작합니다.',
      description: (
        <pre className='mt-2 w-[340px] rounded-t-md bg-blue p-4'>
          <code className='text-'>
            최종 목표: {data.goal}
            {data.description && `\n설명: ${data.description}`}
            {data.subjects.length > 0 &&
              `\n학습 중인 과목: ${data.subjects.map((item) => item.value)}`}
          </code>
        </pre>
      ),
    });
  };

  return (
    <Layout>
      <div className='flex flex-col justify-center bg-two'>
        <div className='flex flex-col items-center justify-center text-base md:text-xl'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
              {/* Goal 필드 */}
              <div className='bg-two -t-md p-6 text-center'>
                <FormField
                  control={form.control}
                  name='goal'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-base md:text-xl text-ef'>
                        최종 목표
                      </FormLabel>
                      <FormControl>
                        <Input
                          className='text-xs md:text-base w-1/2 lg:w-1/3 mx-auto text-center'
                          placeholder='최종 목표를 입력해주세요.'
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className='ml-3 text-xs md:text-base text-neutral-400'>
                        최종 목표를 기반으로 분석합니다.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='bg-four rounded-t-xl p-6 flex flex-col gap-8'>
                {/* 동적 과목 필드 */}
                <div className='flex flex-col gap-2'>
                  <FormLabel className='text-sm md:text-xl text-ef'>
                    학습 중인 과목
                  </FormLabel>
                  {fields.map((field, index) => (
                    <div key={field.id} className='flex items-start space-x-2'>
                      <FormField
                        control={form.control}
                        name={`subjects.${index}.value`}
                        render={({ field }) => (
                          <FormItem className='flex-1'>
                            <FormControl>
                              <Input
                                className='text-xs md:text-base h-full'
                                placeholder='학습중인 과목을 입력해주세요.'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {fields.length > 1 && (
                        <Button
                          type='button'
                          className='bg-red-500/40 hover:bg-red-400 h-full text-xs md:text-base'
                          onClick={() => remove(index)}
                        >
                          삭제
                        </Button>
                      )}
                    </div>
                  ))}
                  <div className='w-full flex items-center justify-center'>
                    <Button
                      type='button'
                      onClick={() => append({ value: '' })}
                      className='h-fit py-1 px-2 md:px-3 text-xs md:text-sm text-four bg-blue hover:bg-green hover:text-four m-2'
                    >
                      과목 추가
                    </Button>
                  </div>
                </div>

                {/* Description 필드 */}
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm md:text-xl text-ef'>
                        추가 설명{' '}
                        <span className='text-neutral-400'>[선택]</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className='text-xs md:text-base h-40 md:h-64'
                          placeholder='현재 준비하고 계신 부분이나 학습 중인 부분을 자세하게 작성해주시면 분석에 도움됩니다. '
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='flex items-center justify-center bg-four pb-6'>
                <Button
                  className='bg-blue hover:bg-green w-2/3 md:w-1/2 lg:w-1/3 text-sm md:text-base text-four'
                  type='submit'
                >
                  제출
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export { HomePage };
