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

export default function FeatureList({ order, data = featureList, loading = false }) {
  const FeatureListSkeleton = () => (
    <div className="
      container 
      grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4
      gap-4 lg:gap-5
      py-[30px] sm:py-[35px] md:py-[40px] lg:py-[45px]
    ">
      {[...Array(4)].map((_, idx) => (
        <div key={idx} className="flex flex-col items-center text-center p-3">
          <div className="
            !w-[25px] !h-[25px]
            sm:!w-[35px] sm:!h-[35px]
            lg:!w-[40px] lg:!h-[40px]
            mb-3 bg-gray-300 rounded-full skeleton
          "></div>

          <div className="!w-20 !h-3 bg-gray-300 rounded mb-1 skeleton"></div>
          <div className="!w-24 !h-2 bg-gray-200 rounded skeleton"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ order }}>
      {loading ? (
        <FeatureListSkeleton />
      ) : data?.icons?.length > 0 ? (
        <div
          className="
            py-[20px]
          "
          style={{
            backgroundColor: "transparent",
          }}
        >
          <div
            className="
              container !px-0
              grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4
              gap-4 lg:gap-5
            "
          >
            {data.icons.map((feature, idx) => (
              <div
                key={idx}
                className="
                  rounded-md
                  flex flex-col items-center text-center
                "
              >
                {/* ICON — 25px mobile → 40px desktop */}
                <i
                  className={`
                    fas ${feature.icon_name}
                    text-[25px] sm:text-[32px] lg:text-[40px]
                    mb-[15px]
                  `}
                  style={{
                    color: "var(--main)",
                  }}
                ></i>

                {/* TITLE — 10px mobile → 16px desktop */}
                <h3
                  className="
                    text-[10px] sm:text-[13px] lg:text-[16px]
                    font-semibold
                    mb-[10px] sm:mb-[12px] lg:mb-[15px]
                  "
                  style={{
                    color: "#252A50",
                  }}
                >
                  {feature.title}
                </h3>

                {/* SUBTITLE — 10px mobile → 13px desktop */}
                <p
                  className="
                    text-[7px] sm:text-[8px] md:text-[10px] lg:text-[13px]
                  "
                  style={{
                    color: "#77839D",
                  }}
                >
                  {feature.sub_title || "وصف"}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

