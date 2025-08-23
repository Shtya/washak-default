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
      <div key={slug} className="bg-gray-50 min-h-[calc(100vh-300px)]">
        {loading ? (
          <div className="container min-h-[calc(100vh-300px)]">
            <Breadcrumb cn="!mt-0 !pt-[30px] container" routes={breadcrumbRoutes} />
            <div className="rounded-3xl p-[30px] min-h-[250px]">
              <SkeletonBlock height='200px' className="mb-4" />
            </div>
            <div className="mt-8">
              <SkeletonBlock height='150px' />
            </div>
          </div>
        ) : page ? (
          <div className="container min-h-[calc(100vh-300px)]">
            <Breadcrumb cn="!mt-0 !pt-[30px] container" routes={breadcrumbRoutes} />
            <div className="bg-white rounded-3xl p-[30px] min-h-[250px]">
              <div
                dangerouslySetInnerHTML={{
                  __html: page.content.value,
                }}
              />
            </div>
            <FeatureList />
          </div>
        ) : (
          <NotFoundPage />
        )}
      </div>
    </>
  );
};


export default DynamicPage;
