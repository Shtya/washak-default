import React , {useState , useMemo , useEffect} from 'react';

export default function Timer({data}) {

 const parseTimeData = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      const days = parseInt(parsed.day || '0', 10);
      const hours = parseInt(parsed.hour || '0', 10);
      const minutes = parseInt(parsed.min || '0', 10);
      const seconds = parseInt(parsed.sec || '0', 10);
      return ((days * 24 * 60 * 60) +
              (hours * 60 * 60) +
              (minutes * 60) +
              seconds);
    } catch (e) {
      return 0;
    }
  };

  const getInitialCountdown = () => {
    const totalDuration = parseTimeData(data.count_down_timer_end); // in seconds

    const addedOn = new Date(data.countdown_added_on.replace(' ', 'T')); // convert to ISO format
    const now = new Date();
    const elapsed = Math.floor((now - addedOn) / 1000); // elapsed time in seconds

    const remaining = totalDuration - elapsed;
    return remaining > 0 ? remaining : 0;
  };

  const [countdown, setCountdown] = useState(getInitialCountdown);

  const format = num => (num < 10 ? '0' + num : num);

  const { days, hours, minutes, seconds } = useMemo(() => {
    const days = Math.floor(countdown / (24 * 60 * 60));
    const hours = Math.floor((countdown % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((countdown % 3600) / 60);
    const seconds = countdown % 60;
    return { days, hours, minutes, seconds };
  }, [countdown]);

  useEffect(() => {
    if (countdown === 0) return;

    const interval = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

//   if (countdown <= 0) return null;

    return (
        <div>
            <div className=' mt-[30px] text-base text-[#051959] '> الوقت المتبقي علي نهاية العرض :</div>

            <div className=' mt-[10px] flex gap-4 font-medium text-lg text-gray-700'>
                <div className='text-sm text-[#252A50] flex flex-col gap-[5px]  '>
                    <span className='Numbers bg-[var(--main)] text-white text-lg rounded-md  w-[50px] h-[40px] flex items-center justify-center border-2 border-[#F1E5E538]  '>{format(days)}</span>
                    <span className='capitalize text-center text-base  '> يوم </span>
                </div>
                <div className='text-sm text-[#252A50] flex flex-col gap-[5px]  '>
                    <span className='Numbers bg-[#F8FAFB] text-[#93979C] text-lg rounded-md  w-[50px] h-[40px] flex items-center justify-center  border-2 border-[#F0F1F1]  '>{format(hours)}</span>
                    <span className='capitalize text-center text-base '> ساعة </span>
                </div>
                <div className='text-sm text-[#252A50] flex flex-col gap-[5px]  '>
                    <span className='Numbers bg-[#F8FAFB] text-[#93979C] text-lg rounded-md  w-[50px] h-[40px] flex items-center justify-center  border-2 border-[#F0F1F1]  '>{format(minutes)}</span>
                    <span className='capitalize text-center text-base '> دقيقة </span>
                </div>
                <div className='text-sm text-[#252A50] flex flex-col gap-[5px]  '>
                    <span className='Numbers bg-[#F8FAFB] text-[#93979C] text-lg rounded-md  w-[50px] h-[40px] flex items-center justify-center  border-2 border-[#F0F1F1]  '>{format(seconds)}</span>
                    <span className='capitalize text-center text-base '> ثانية </span>
                </div>
            </div>
        </div>
    );
}
