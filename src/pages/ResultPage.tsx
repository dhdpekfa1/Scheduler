import { Layout } from '@/components/frame';
import mockData from '@/assets/mock/data.json';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from 'react';
import { Button } from '@/components/ui';

const ResultPage = () => {
  const wiseSaying = [
    '⏳ 버티자, 견디자',
    '🎯 시작이 반',
    '💡 하다 보면 되겠지',
    '🚀 일단 기릿',
    '✅ 결국 언젠가 해낸다',
  ];

  const pdfRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!pdfRef.current) return;

    const element = pdfRef.current;

    // 임시 div를 만들어 lg 화면 기준으로 조정
    const clonedElement = element.cloneNode(true) as HTMLElement;
    clonedElement.style.width = '1024px';
    clonedElement.style.position = 'absolute';
    clonedElement.style.top = '-9999px';
    document.body.appendChild(clonedElement);

    // 캔버스 생성
    const canvas = await html2canvas(clonedElement, {
      scale: 2,
      backgroundColor: null,
    });

    // 캔버스 크기 조정
    document.body.removeChild(clonedElement);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const imgWidth = 210; // A4 크기
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('학습 솔루션.pdf');
  };

  return (
    <Layout>
      {/* PDF 다운로드 버튼 (우측 상단) */}
      <div className='flex items-center w-full justify-end my-2'>
        <Button
          onClick={handleDownloadPDF}
          className='bg-[#ddd]/60 text-white py-2 px-4 rounded-md hover:bg-[#ddd]/50 transition text-sm md:text-base'
        >
          PDF 다운로드
        </Button>
      </div>

      {/* PDF로 캡처할 부분 */}
      <div
        className='flex flex-col items-center justify-center bg-two'
        ref={pdfRef}
      >
        <div className='min-h-screen bg-white rounded-t-lg'>
          <div className='grid grid-cols-2 max-sm:grid-cols-1 max-sm:flex max-sm:flex-col-reverse gap-4 text-base md:text-xl rounded-t-lg p-5'>
            {/* 학습 과목 추천 */}
            <div className='flex flex-col gap-2 bg-yellow rounded p-8'>
              <h3 className='text-base md:text-xl text-four font-semibold'>
                학습 과목 추천
              </h3>
              <div className='flex flex-col'>
                {mockData.priorities.map((subject: string) => (
                  <span
                    key={subject}
                    className='text-sm md:text-base text-three break-keep'
                  >
                    👉🏻 {subject}
                  </span>
                ))}
              </div>
            </div>

            {/* 응원 */}
            <div className='flex flex-col gap-2 bg-four rounded p-8'>
              <div className='flex flex-col'>
                {wiseSaying.map((sentence: string) => (
                  <span
                    key={sentence}
                    className='text-sm md:text-base text-ef font-semibold break-keep'
                  >
                    {sentence}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 피드백 */}
          <div className='bg-white p-5 flex flex-col gap-8'>
            <div className='flex flex-col gap-2 bg-pink rounded p-8'>
              <h3 className='text-base md:text-xl text-four font-semibold'>
                피드백
              </h3>
              <div className='flex flex-col'>
                <span className='text-sm md:text-base text-three break-keep'>
                  {mockData.feedback}
                </span>
              </div>
            </div>
            {/* 설명 */}
            <div className='flex flex-col gap-2 bg-blue rounded p-8'>
              <h3 className='text-base md:text-xl text-four font-semibold'>
                전반적인 설명
              </h3>
              <div className='flex flex-col'>
                <span className='text-sm md:text-base text-three break-keep'>
                  {mockData.explain}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export { ResultPage };
