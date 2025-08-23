const featureList = {
  section_info: {
    id: 599,
    section_id: 4396,
    created_at: '2025-05-11T14:15:08.000000Z',
    updated_at: '2025-05-11T14:15:08.000000Z',
  },
  icons: [
    {
      id: 1438,
      icon_id: 599,
      title: '\u062c\u0648\u062f\u0629 \u0645\u0636\u0645\u0648\u0646\u0629',
      sub_title: '\u0646\u0642\u0648\u0645 \u0628\u0641\u062d\u0635 \u0643\u0644 \u0645\u0646\u062a\u062c \u0639\u0644\u0649 \u0645\u0648\u0642\u0639\u0646\u0627 \u0628\u062e\u0637\u0648\u0627\u062a \u0635\u0627\u0631\u0645\u0629',
      title_color: '#000000',
      subtitle_color: '#000000',
      background_color: '#ffffff',
      icon_name: 'fa-check',
      section_color: '#000000',
      icon_color: '#000000',
      border_color: '#ffffff',
      created_at: '2025-05-11T14:15:08.000000Z',
      updated_at: '2025-05-11T14:15:08.000000Z',
    },
    {
      id: 1439,
      icon_id: 599,
      title: '\u0627\u0633\u062a\u0631\u062c\u0627\u0639 \u0633\u0647\u0644',
      sub_title: '\u0627\u0633\u062a\u0631\u062c\u0639 \u0634\u062d\u0646\u062a \u0628\u0637\u0631\u064a\u0642\u0629 \u0633\u0647\u0644\u0647 \u062d\u0627\u0644 \u0643\u0627\u0646 \u0647\u0646\u0627\u0643 \u0645\u0634\u0643\u0644\u0647',
      title_color: '#000000',
      subtitle_color: '#000000',
      background_color: '#ffffff',
      icon_name: 'fa-tags',
      section_color: '#000000',
      icon_color: '#000000',
      border_color: '#ffffff',
      created_at: '2025-05-11T14:15:08.000000Z',
      updated_at: '2025-05-11T14:15:08.000000Z',
    },
    {
      id: 1440,
      icon_id: 599,
      title: '\u062a\u0648\u0635\u064a\u0644 \u0633\u0631\u064a\u0639',
      sub_title: '\u0646\u0639\u0645\u0644 \u0639\u0644\u064a \u062a\u0648\u0635\u064a\u0644 \u0634\u062d\u0646\u062a\u0643 \u0628\u0627\u0633\u0631\u0639 \u0648\u0642\u062a',
      title_color: '#000000',
      subtitle_color: '#000000',
      background_color: '#ffffff',
      icon_name: 'fa-bicycle',
      section_color: '#000000',
      icon_color: '#000000',
      border_color: '#ffffff',
      created_at: '2025-05-11T14:15:08.000000Z',
      updated_at: '2025-05-11T14:15:08.000000Z',
    },
    {
      id: 1441,
      icon_id: 599,
      title: '\u062e\u0635\u0648\u0645\u0627\u062a \u062d\u0635\u0631\u064a\u0629',
      sub_title: '\u0623\u0641\u0636\u0644 \u0627\u0644\u0639\u0631\u0648\u0636 \u0648\u0627\u0644\u0623\u0633\u0639\u0627\u0631 \u0639\u0644\u0649 \u0627\u0644\u0642\u0637\u0639 \u0627\u0644\u0641\u0627\u062e\u0631\u0629',
      title_color: '#000000',
      subtitle_color: '#000000',
      background_color: '#ffffff',
      icon_name: 'fa-tags',
      section_color: '#000000',
      icon_color: '#000000',
      border_color: '#ffffff',
      created_at: '2025-05-11T14:15:08.000000Z',
      updated_at: '2025-05-11T14:15:08.000000Z',
    },
  ],
};
export default function FeatureList({ order, data = featureList, loading }) {
  const renderSkeleton = () => (
    <div className='container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
      {[...Array(4)].map((_, idx) => (
        <div key={idx} className='flex flex-col items-center text-center p-4 '>
          <div className='!w-[50px] !h-[50px] mb-4 bg-gray-300 rounded-full skeleton '></div>
          <div className='!w-24 !h-4 bg-gray-300 rounded mb-2 skeleton '></div>
          <div className='!w-32 !h-3 bg-gray-200 rounded skeleton '></div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => (
    <div className='container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
      {data?.icons.map((feature, idx) => (
        <div key={idx} className='flex flex-col items-center text-center p-4'>
          {/* <img src={feature.img || `/icons/feature-list/default.png`} alt={feature?.title} className="w-[50px] h-[50px] mb-4" /> */}
          <i className={`fas ${feature.icon_name}  text-4xl  text-[var(--main)]  mb-[20px]`}></i>

          <h3 className='text-lg font-semibold text-[#252A50] mb-1'> {feature.title} </h3>
          <p className='text-[#77839D] text-sm'>{feature.sub_title || 'وصف'}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className='bg-[#f8fafb] pt-[50px] pb-[50px] !mt-6 ' style={{ order }}>
      {loading ? renderSkeleton() : renderContent()}
    </div>
  );
}
