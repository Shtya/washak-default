import { splitSentence } from '../../helper/splitSentence';

export default function HeadTitle({ title, desc, arrowTop, loading = false }) {
    const [one, two] = splitSentence(title)

    if (loading) return <div className='skeleton w-[150px] h-6 mx-auto rounded-md' />;
    return (
        <div className='flex items-center flex-col gap-[5px] ' >

            <div className={` text-2xl max-md:text-lg font-[600] text-[var(--main)] flex gap-[5px] justify-center  ${arrowTop ? 'text-right !mt-0 ' : 'text-center'} `}>
                <span>{one}</span>
                <span className='text-[var(--second)]'>{two}</span>
            </div>

            {desc && <p className='text-lg opacity-70 max-md:text-base text-[var(--primary)] ' > {desc}</p>}
        </div>
    );
}
