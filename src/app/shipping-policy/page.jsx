'use client';
import Breadcrumb from'@/components/atoms/Breadcrumb';
import FeatureList from'@/components/molecules/FeatureList';

export default function page() {

    const breadcrumbRoutes = [{ label: 'الرئيسية', href: '/' },{ label: 'سياسة الشحن' }];

    return (
        <div className='bg-[#f8fafb]  '>
            <Breadcrumb cn=' !mt-0  !pt-[30px] container' routes={breadcrumbRoutes} />

            <div className=" container max-md:mt-[50px]  ">
                <div className=" border border-[var(--border-bg)] rounded-lg min-h-fit flex justify-center flex-col  bg-white p-[30px]  h-full text-[#878FA7] max-md:text-base  text-lg space-y-4">
                    <p>- مدة التوصيل في الغالب لا تتجاوز ٥ يوم عمل تحسب من تاريخ تسليم الطلب للشركة الناقلة لإيصال منتجاتنا إليكم لكن قد يتم تجاوز هذه المدة بحسب دقة عنوان التسليم، تواجد العميل بموقع التسليم، الشركة الناقلة، الإجراءات الجمركية، والظروف القاهرة وغيرها من الأمور المؤثرة على العمليات اللوجستية في المنطقة.</p>
                    <p>- سوف تتواصل معكم شركة الشحن على الارقام المزودة من قبلكم بعدة طرق بما يتناسب مع اوقاتها وسياساتها ويتوجب على العميل التجاوب مع شركة النقل والتنسيق معها لاستلام الطلب.</p>
                    <p>- في حال لم يتم استلام الشحنة من قبل المستلم لأي سبب كان وترتب على ذلك إعادتها للمتجر، لا يتحمل المتجر اية رسوم للإعادة الشحن أو ضياع الشحنة.</p>
                    <p>- لا يتحمل المتجر مسؤولية تأخر الشحنات او تلفها خلال النقل أو التخزين خارج مخازن المتجر، ولا نقبل بالتعويض عن التلف الناتج عن هذه العملية ويتم التفاهم مباشرة بين العميل وشركة الشحن حيث ان جميع الشحنات تكون مأمنه.</p>
                    <p>- يجب مراعاة ايام العطل ونهايات الأسبوع والأعياد الرسمية خلال عملية الشحن حيث لا تحتسب ضمن عدد ايام الشحن.</p>
                </div>
            </div>

            <FeatureList />
        </div>
    );
}
