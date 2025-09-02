import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

// Import testimonial images
import NinaImg from '../assets/images/Nina L.png';
import MarkoImg from '../assets/images/Marko B.png';
import LauraHImg from '../assets/images/Laura H.png';
import JovanaImg from '../assets/images/Jovana M.png';
import LauraSImg from '../assets/images/Laura S.png';
import MarkusImg from '../assets/images/Markus H.png';
import IsabelImg from '../assets/images/Isabel K.png';
import TimImg from '../assets/images/Tim R.png';
import AnnaImg from '../assets/images/Anna M.png';

// Map testimonial IDs to their images
const testimonialImages = {
  nina: NinaImg,
  marko: MarkoImg,
  laura: LauraHImg,
  jovana: JovanaImg,
  lauras: LauraSImg,
  markus: MarkusImg,
  isabel: IsabelImg,
  tim: TimImg,
  anna: AnnaImg,
};

const MobileAppTestimonialsSection = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonialsContainerRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);

  // Get testimonials data and convert object to array
  const testimonialsObj = t('services.mobile.testimonials.items', {
    returnObjects: true,
  });
  const testimonials = Object.entries(testimonialsObj).map(([key, value]) => ({
    id: key,
    ...value,
  }));

  const itemsToShow = window.innerWidth < 768 ? 1 : 3;
  const canScroll = testimonials.length > itemsToShow;

  const goToNext = useCallback(() => {
    if (canScroll) {
      setActiveIndex((prev) => {
        const nextIndex = prev + 1;
        return nextIndex >= testimonials.length - itemsToShow + 1
          ? 0
          : nextIndex;
      });
    }
  }, [canScroll, testimonials.length, itemsToShow]);

  const goToPrev = useCallback(() => {
    if (canScroll) {
      setActiveIndex((prev) => {
        const prevIndex = prev - 1;
        return prevIndex < 0
          ? Math.max(0, testimonials.length - itemsToShow)
          : prevIndex;
      });
    }
  }, [canScroll, testimonials.length, itemsToShow]);

  useEffect(() => {
    if (!canScroll) return;

    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }

    autoScrollIntervalRef.current = setInterval(goToNext, 2000);

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [canScroll, goToNext, activeIndex]);

  const visibleTestimonials = testimonials.slice(
    activeIndex,
    activeIndex + itemsToShow
  );

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 text-accent`}
        fill='currentColor'
        viewBox='0 0 20 20'
      >
        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
      </svg>
    ));
  };

  return (
    <section className='py-20' id='TestimonialsSection'>
      <div className='container mx-auto px-4 max-w-7xl'>
        <div className='text-center mb-16'>
          <h2 className='heading-section capitalize'>
            {t('services.mobile.testimonials.title')}
          </h2>
          <p className='text-gray-600 text-lg max-w-3xl mx-auto'>
            {t('services.mobile.testimonials.subtitle')}
          </p>
        </div>

        <div ref={testimonialsContainerRef} className='max-w-6xl mx-auto'>
          <div className='flex overflow-x-auto space-x-8'>
            {visibleTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className='bg-white border border-gray-100 rounded-lg p-8 flex flex-col items-center text-center min-w-full md:min-w-0'
              >
                <div className='w-24 h-24 mb-6'>
                  <img
                    src={testimonialImages[testimonial.id]}
                    alt={testimonial.author}
                    className='w-full h-full rounded-full object-cover'
                  />
                </div>
                <h3 className='text-xl font-semibold mb-4'>
                  {testimonial.author}
                </h3>
                <div className='flex space-x-1 mb-4'>{renderStars()}</div>
                <p className='text-accent font-semibold mb-2'>
                  {testimonial.position}
                </p>
                <p className='text-gray-600 text-sm leading-relaxed'>
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>

          <div className='flex justify-center mt-12 space-x-4'>
            <button
              onClick={() => {
                goToPrev();
                if (autoScrollIntervalRef.current) {
                  clearInterval(autoScrollIntervalRef.current);
                  autoScrollIntervalRef.current = setInterval(goToNext, 5000);
                }
              }}
              disabled={!canScroll || activeIndex === 0}
              className='w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              aria-label={t('common.previous')}
            >
              <svg
                className='w-6 h-6 text-gray-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 19l-7-7 7-7'
                />
              </svg>
            </button>
            <button
              onClick={() => {
                goToNext();
                if (autoScrollIntervalRef.current) {
                  clearInterval(autoScrollIntervalRef.current);
                  autoScrollIntervalRef.current = setInterval(goToNext, 5000);
                }
              }}
              disabled={
                !canScroll || activeIndex >= testimonials.length - itemsToShow
              }
              className='w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              aria-label={t('common.next')}
            >
              <svg
                className='w-6 h-6 text-gray-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppTestimonialsSection;
