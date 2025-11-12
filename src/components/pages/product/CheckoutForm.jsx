import { motion } from "framer-motion";
import Title from '../../atoms/Title';

export const CheckoutForm = ({ checkoutFields, register, errors, className, title }) => {

  return (
    <motion.form
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className={`m-4 checkout space-y-4 !mb-8 rounded-lg overflow-hidden ${className}`}
      data-aos='fade-up'
    >

      {title ? <CustomTilte rawTitle={title} />
        : <Title title1='يرجى ادخال معلوماتك ' title2='لإكمال الطلب' cn='!mb-8'
          styleTitle={{ textWrap: 'nowrap' }}
          styleTitle2={{ textWrap: 'wrap' }} />}
      {checkoutFields.map(field => {
        if (!field.is_enable) return null;

        const hasError = errors[field.backend_field_name];
        return (
          <div key={field.id} className='flex flex-col gap-[10px] relative'>
            <FieldLabel field={field} />
            <FieldWrapper field={field} hasError={hasError}>
              {field.type === 'select' ? (
                <FieldSelect field={field} register={register} />
              ) : field.type === 'textarea' ? (
                <FieldTextarea field={field} register={register} />
              ) : field.type === 'hidden' ? (
                <FieldHidden field={field} register={register} />
              ) : (
                <FieldInput field={field} register={register} />
              )}
            </FieldWrapper>
            <FieldError error={hasError} />
          </div>
        );
      })}
    </motion.form>
  );
};


function CustomTilte({ rawTitle }) {
  const words = rawTitle.trim().split(/\s+/);
  if (words.length === 1) {
    return <Title title1={words[0]} title2="" cn="!mb-8" />;
  }

  if (words.length <= 3) {
    const title2 = words.pop(); // last word
    const title1 = words.join(" ");
    return <Title title1={title1} title2={title2} cn="!mb-8" />;
  }

  // For longer titles, you can customize further if needed
  const lastTwo = words.splice(-2).join(" "); // removes them from words array
  const firstPart = words.join(" "); // remaining words

  return <Title title1={firstPart} title2={lastTwo} cn="!mb-8" />;
};

const FieldLabel = ({ field }) => (
  field.type !== 'hidden' && (
    <label htmlFor={field.backend_field_name} className='label text-base font-normal'>
      {field.field_text}
      {field.is_required ? <span className='text-[#ff4b55]'>*</span> : ""}
    </label>
  )
);

const FieldWrapper = ({ field, children, hasError }) => (
  <div className={`${field.type !== 'textarea' && 'h-[50px]'} ${field.type === 'hidden' && 'hidden'} wrapper relative overflow-hidden rounded-[8px] text-sm border ${hasError ? '!border-[#ff4b55]' : ''} w-full`}>
    {children}
  </div>
);

const FieldInput = ({ field, register }) => {
  const isNumber = field.type?.toLowerCase() === "number";

  const validationRules = {
    required: field.is_required ? `${field.field_text} مطلوب` : false,
    ...(isNumber && field.min_length && {
      min: {
        value: field.min_length,
        message: `${field.field_text} يجب أن يكون أكبر من أو يساوي ${field.min_length}`,
      },
    }),
    ...(isNumber && field.max_length && {
      max: {
        value: field.max_length,
        message: `${field.field_text} يجب أن يكون أقل من أو يساوي ${field.max_length}`,
      },
    }),
    ...(!isNumber && field.min_length && {
      minLength: {
        value: field.min_length,
        message: `${field.field_text} يجب أن يحتوي على ${field.min_length} أحرف على الأقل`,
      },
    }),
    ...(!isNumber && field.max_length && {
      maxLength: {
        value: field.max_length,
        message: `${field.field_text} يجب ألا يتجاوز ${field.max_length} حرفًا`,
      },
    }),
  };

  return <input
    type={field.type?.toLowerCase() || 'text'}
    id={field.backend_field_name}
    {...register(field.backend_field_name, validationRules)}
    {...(isNumber && {
      min: field.min_length,
      max: field.max_length,
    })}
    {...(!isNumber && {
      maxLength: field.max_length,
      minLength: field.min_length,
    })}
    placeholder={field.field_placeholder}
    className='checkout-text text-[#222] font-normal w-full px-[10px] h-full outline-none'
  />
};

const FieldTextarea = ({ field, register }) => (
  <textarea
    id={field.backend_field_name}
    {...register(field.backend_field_name, {
      required: field.is_required ? `${field.field_text} مطلوب` : false,
      ...(field.min_length && {
        minLength: {
          value: field.min_length,
          message: `${field.field_text} يجب أن يحتوي على ${field.min_length} أحرف على الأقل`,
        },
      }),
      ...(field.max_length && {
        maxLength: {
          value: field.max_length,
          message: `${field.field_text} يجب ألا يتجاوز ${field.max_length} حرفًا`,
        },
      }),
    })}
    placeholder={field.field_placeholder}
    className={`checkout-text text-[#222] font-normal w-full px-[10px] py-[8px] outline-none resize-none 
    ${field.min_length && field.min_length > 100 ? 'h-[150px]' : 'h-[100px]'}`}
  />
);

const FieldSelect = ({ field, register }) => (
  <select
    id={field.backend_field_name}
    defaultValue={field.default_option || ''}
    {...register(field.backend_field_name, {
      required: field.is_required ? `${field.field_text} مطلوب` : false,
    })}
    className='checkout-text text-[#222] font-normal w-full px-[10px] h-full outline-none bg-white'
  >
    <option value="" disabled>{field.field_placeholder || 'اختر خياراً'}</option>
    {field.settings?.split(',').map(option => (
      <option key={option.trim()} value={option.trim()}>
        {option.trim()}
      </option>
    ))}
  </select>
);

const FieldHidden = ({ field, register }) => (
  <input
    type="hidden"
    id={field.backend_field_name}
    value={field.default_value ?? ''}
    {...register(field.backend_field_name)}
  />
);

const FieldError = ({ error }) => (
  error && <div className='text-[#ff4b55] mt-[-10px] text-sm'>{error.message}</div>
);


