import { Phone, Mail, MapPin, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-hot-toast';
import { api } from '../config/Api';
import Input from '../components/atoms/Input';
import TextArea from '../components/atoms/TextArea';
import Button from '../components/atoms/Button';
import FeatureList from '../components/molecules/FeatureList';
import { useAppContext } from '../contexts/AppContext';
import useJsonParser from '../hooks/useJsonParser';
import { Helmet } from 'react-helmet';

/* ======================
   Validation Schema
====================== */
const contactSchema = yup.object().shape({
  name: yup.string().required('الاسم الكامل مطلوب').max(100, 'يجب ألا يزيد الاسم الكامل عن 100 حرف'),
  phone: yup.string().required('رقم الجوال مطلوب').max(20, 'يجب ألا يزيد رقم الجوال عن 20 رقم'),
  email: yup.string().email('البريد الإلكتروني غير صحيح').required('البريد الإلكتروني مطلوب'),
  message: yup.string().required('الرسالة مطلوبة').min(10, 'الرسالة يجب أن تحتوي على الأقل 10 أحرف'),
});

/* ======================
   Main Page
====================== */
export default function ContactUsPage() {
  const { storeOptions: data, optionsLoading: loading, menuSetting, loadingSetting } = useAppContext();
  const settings = useJsonParser(
    menuSetting?.footer?.[0]?.settings,
    'Failed to parse footer settings:'
  );
  const {
    footer_phone_number = '',
    footer_email = '',
  } = settings;

  const contactData = data?.contactus_page_data;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: yupResolver(contactSchema) });

  const onSubmit = async (formData) => {
    const toastId = toast.loading('جاري إرسال الرسالة...');

    try {
      await api.post(
        '/contact-us-query',
        JSON.stringify(formData),
        { headers: { 'Content-Type': 'application/json' } }
      );

      toast.success('تم إرسال رسالتك بنجاح!', { id: toastId });
      reset();
    } catch (err) {
      toast.error(err.message || 'حدث خطأ أثناء إرسال الرسالة', { id: toastId });
    }
  };


  const {
    contactus_page_title = 'اتصل بنا',
    contactus_page_content = '<p>نحن هنا للرد على جميع استفساراتك</p>',
    contactus_page_form_status = 'yes',
    contactus_page_map_status = 'no',
    contactus_page_map_latitude = '',
    contactus_page_map_longitude = '',
    contactus_page_map_title = 'Map',
    contactus_page_map_sub_title = 'Store Map',
  } = contactData?.value || {};

  const showForm = contactus_page_form_status === 'yes';
  const showMap = contactus_page_map_status === 'yes' && contactus_page_map_latitude && contactus_page_map_longitude;

  return (
    <>
      <div>
        <main>

          {/* Header */}
          <section className="
          bg-gradient-to-b from-[var(--main)] to-[var(--hover-main)] text-white 
          px-4 text-center
          py-[30px] sm:py-[40px] md:py-[50px]
        ">
            {loading ? (
              <div className="max-w-2xl mx-auto space-y-4">
                <div className="h-6 sm:h-7 bg-white/20 rounded-full w-1/2 mx-auto animate-pulse"></div>
                <div className="h-4 bg-white/20 rounded-full w-3/4 mx-auto animate-pulse"></div>
              </div>
            ) : (
              <>
                <h1 className="
                font-bold mb-3
                text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px]
              ">
                  {contactus_page_title}
                </h1>

                <div
                  className="
                  max-w-2xl mx-auto text-white/90
                  text-[12px] sm:text-[14px] md:text-[16px]
                "
                  dangerouslySetInnerHTML={{ __html: contactus_page_content }}
                />
              </>
            )}
          </section>

          {/* Content */}
          <div
            className={`
            max-w-6xl mx-auto
            p-3 sm:p-4 md:p-6
            grid gap-[20px] sm:gap-[30px] md:gap-[40px]
            my-[20px] sm:my-[30px] md:my-[40px]
            ${showForm ? "md:grid-cols-2" : "grid-cols-1"}
          `}
          >
            {showForm && (
              <ContactForm
                loading={loading}
                register={register}
                errors={errors}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                isSubmitting={isSubmitting}
              />
            )}

            <div className="space-y-[20px] sm:space-y-[25px] md:space-y-[30px]">
              <ContactInfo
                loading={loading || loadingSetting}
                phone={footer_phone_number}
                email={footer_email}
              />

              <ContactMap
                loading={loading}
                showMap={showMap}
                title={contactus_page_map_title}
                subTitle={contactus_page_map_sub_title}
                lat={contactus_page_map_latitude}
                lng={contactus_page_map_longitude}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}


/* ======================
   Form Component
====================== */
function ContactForm({ loading, register, errors, handleSubmit, onSubmit, isSubmitting }) {
  return (
    <div className="
      bg-gray-100/30 
      p-[15px] sm:p-[18px] md:p-[22px]
      rounded-md shadow-[0px_4px_4px_0px_#CFCFCF40]
      border border-gray-200/60
    ">
      {loading ? (
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded-full w-1/3 animate-pulse"></div>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
          <div className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-10 bg-gray-300 rounded-lg animate-pulse"></div>
        </div>
      ) : (
        <>
          <h2 className="
            font-bold mb-6 text-[#002c5f]
            text-[16px] sm:text-[18px]
          ">
            أرسل رسالة
          </h2>

          <form className="space-y-3 lg:space-y-4 ">
            <Input
              name="name"
              type="text"
              place="الاسم الكامل"
              KEY="name"
              register={register("name")}
              error={errors?.name}
              required
              cn="w-full h-[45px] contact-input"
              cnInput="border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002c5f] focus:border-transparent"
            />

            <Input
              name="phone"
              type="tel"
              place="رقم الجوال"
              KEY="phone"
              register={register("phone")}
              error={errors?.phone}
              required
              cn="w-full h-[45px] contact-input"
              cnInput="input-end border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002c5f] focus:border-transparent"
            />

            <Input
              name="email"
              type="email"
              place="البريد الإلكتروني"
              KEY="email"
              register={register("email")}
              error={errors?.email}
              required
              cn="w-full h-[45px] contact-input"
              cnInput="border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002c5f] focus:border-transparent"
            />

            <TextArea
              name="message"
              place="اكتب رسالتك هنا"
              KEY="message"
              register={register("message")}
              error={errors?.message}
              required
              cn="w-full contact-input"
              cnInput="border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002c5f] focus:border-transparent h-[120px]"
            />

            <Button
              onclick={handleSubmit(onSubmit)}
              name={isSubmitting ? "جاري الإرسال..." : "إرسال الآن"}
              disabled={isSubmitting}
              loading={isSubmitting}
              cn="btn main-btn"
              icon={isSubmitting && <Loader2 className="animate-spin" />}
            />
          </form>
        </>
      )}
    </div>
  );
}


/* ======================
   Contact Info Component
====================== */
function ContactInfo({ loading, email, phone }) {
  return (
    <>
      <Helmet>
        <title>إتصل بنا</title>
      </Helmet>

      <div className="
        bg-gray-100/30 
        p-[15px] sm:p-[18px] md:p-[22px]
        rounded-md shadow-[0px_4px_4px_0px_#CFCFCF40]
        border border-gray-200/60
      ">
        {loading ? (
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded-full w-1/3 animate-pulse"></div>

            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                <div className="h-4 bg-gray-200 rounded-full w-3/4 animate-pulse"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <h2 className="
              font-bold text-[#002c5f] mb-6
              text-[16px] sm:text-[18px]
            ">
              معلومات التواصل
            </h2>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="text-[#ff8000] flex-shrink-0 w-[16px] h-[16px]" />
                <a href={`tel:${phone}`} className="
                  text-gray-700 hover:text-[#002c5f] transition
                  text-[12px] sm:text-[14px]
                ">
                  {phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-[#ff8000] flex-shrink-0 w-[16px] h-[16px]" />
                <a href={`mailto:${email}`} className="
                  break-all text-gray-700 hover:text-[#002c5f] transition
                  text-[12px] sm:text-[14px]
                ">
                  {email}
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

/* ======================
   Map Component
====================== */
function ContactMap({ loading, showMap, title, subTitle, lat, lng }) {
  if (loading) {
    return (
      <div className='bg-gray-100/30 p-1 rounded-md shadow-[0px_4px_4px_0px_#CFCFCF40] overflow-hidden border border-gray-200/60'>
        <div className='relative w-full h-64 rounded-lg overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse'></div>
          <div className='absolute top-4 left-4 w-8 h-8 bg-gray-300 rounded-full'></div>
          <div className='absolute bottom-8 right-8 w-16 h-4 bg-gray-300 rounded'></div>
          <div className='absolute bottom-20 left-1/2 w-24 h-6 bg-gray-300 rounded transform -translate-x-1/2'></div>
          <div className='absolute inset-0 opacity-30'>
            <div className='grid grid-cols-3 grid-rows-3 h-full w-full'>
              {[...Array(9)].map((_, i) => (
                <div key={i} className='border border-gray-200'></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!showMap) return null;

  return (
    <div className='bg-gray-100/30 p-1 rounded-md shadow-[0px_4px_4px_0px_#CFCFCF40] overflow-hidden border border-gray-200/60 text-center'>
      {title && <h2 className='text-2xl md:text-xl font-bold text-gray-800 mb-3'>{title}</h2>}
      {subTitle && <p className='text-gray-600 mb-8'>{subTitle}</p>}
      <iframe
        className='w-full h-64 rounded-lg border-0'
        src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
        allowFullScreen
        loading='lazy'
      />
    </div>
  );
}

