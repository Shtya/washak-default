import { splitSentence } from '../../helper/splitSentence';

export default function HeadTitle({ title, desc, arrowTop, align = "center", loading = false }) {
    const [one, two] = splitSentence(title);

    if (loading) return <div className='skeleton w-[150px] h-6 mx-auto rounded-md' />;
    return (
        <div className='flex flex-col gap-[5px]'>
            <div
                className={`text-sm md:text-lg lg:text-xl xl:text-[22px] font-[600] text-[var(--main)] flex gap-[5px] justify-${align} 
                ${arrowTop ? 'text-right !mt-0' : ''}`}
            >
                <span>{one}</span>
                <span className='text-[var(--second)]'>{two}</span>
            </div>

            {desc && (
                <p className='text-xs md:text-base xl:text-lg opacity-70 text-[var(--primary)] text-center'>
                    {desc}
                </p>
            )}
        </div>
    );
}
