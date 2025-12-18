import { useParams } from 'react-router-dom';
import NotFoundPage from './NotFound';
import Breadcrumb from '../components/atoms/Breadcrumb';
import FeatureList from '../components/molecules/FeatureList';
import { useStoreDynamicPages } from '../hooks/useStoreDynamicPages';
import { SkeletonBlock } from '../components/skeleton/SkeletonBlock';
import ErrorDisplay from '../components/atoms/ErrorDisplay';
import { Helmet } from 'react-helmet';

const DynamicPage = () => {
  const { page: slug } = useParams();
  const { data, loading, error } = useStoreDynamicPages('/store-dynamic-pages');
  const page = data?.data.find(item => item.slug === slug);
  const breadcrumbRoutes = [
    { label: 'الرئيسية', href: '/' },
    ...(page?.title ? [{ label: page.title }] : []),
  ];


  if (error) {
    return (
      <ErrorDisplay
        error={error}
        onRetry={() => window.location.reload()}
        title="خطأ في تحميل الصفحة"
        message="عذراً، حدث خطأ أثناء تحميل محتوى هذه الصفحة. يرجى المحاولة مرة أخرى."
      />
    );
  }


  return (
    <>
      {page?.title && <Helmet>
        <title>{page?.title}</title>
      </Helmet>}
      <div key={slug} className=" "
        style={{ background: "var(--dynamic_page_color,  #f8fafb)" }}
      >
        {loading ? (
          <div className="container  !my-0'">
            <Breadcrumb cn=" " routes={breadcrumbRoutes} />
            <div className="rounded-[8px] md:rounded-[12px] lg:rounded-[15px] py-[30px] min-h-[250px]">
              <SkeletonBlock height='200px' className="mb-4" />
            </div>
            <div className="pb-6">
              <SkeletonBlock height='150px' />
            </div>
          </div>
        ) : page ? (
          <div className=" min-h-[calc(100vh-300px)] flex flex-col">
            <div className='container !mt-0 !mb-[12px] sm:!mb-[16px] md:!mb-[20px] lg:!mb-[24px]'>

              <Breadcrumb cn="" routes={breadcrumbRoutes} />
              <div className="mt-auto text-sm md:text-base lg:text-[20px] bg-white rounded-[8px] md:rounded-[12px] lg:rounded-[15px]  p-2 md:p-4 lg:p-6 2xl:p-8 min-h-[250px]">
                <div
                  dangerouslySetInnerHTML={{
                    __html: page.content.value,
                  }}
                />
              </div>
            </div>
            {/* <FeatureList /> */}
          </div>
        ) : (
          <NotFoundPage />
        )}
      </div>
    </>
  );
};


export default DynamicPage;
