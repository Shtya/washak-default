

export function CustomButtonsNavigate({ swiperPrevClass = 'custom-prev', swiperNextClass = 'custom-next' }) {
    return <>
        <button className={`arrow-btn-prev max-sm:hidden bg-[var(--main)] hover:bg-[var(--hover-main)] hover:scale-[1.1] w-[35px] h-[35px] rounded-full flex items-center justify-center absolute left-2 top-1/2 transform -translate-y-1/2 z-10 transition-colors custom-prev ${swiperPrevClass}`}>
            <svg width='15' height='9' viewBox='0 0 15 9' fill="currentColor" stroke="currentColor" xmlns='http://www.w3.org/2000/svg'>
                <path d='M4.71592 0.920471L1.13637 4.50002M1.13637 4.50002L4.71592 8.07956M1.13637 4.50002H13.8636' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
        </button>
        <button className={`arrow-btn-next max-sm:hidden bg-[var(--main)] hover:bg-[var(--hover-main)] hover:scale-[1.1] w-[35px] h-[35px] rounded-full flex items-center justify-center absolute right-2 top-1/2 transform -translate-y-1/2 z-10 transition-colors custom-next ${swiperNextClass}`}>
            <svg width='15' height='9' viewBox='0 0 15 9' fill="currentColor" stroke="currentColor" xmlns='http://www.w3.org/2000/svg'>
                <path d='M10.284 0.920471L13.8635 4.50002M13.8635 4.50002L10.284 8.07956M13.8635 4.50002H1.13623' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
        </button>
    </>
}