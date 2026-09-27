import Title from "./Title";
import { testimonials } from "../assets/assets";
import StarRating from "./StarRating";

const Testimonial = () => {
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-30">
      <Title
        title="What our Guests Say"
        subTitle="Discover why travelers choose QuickStay for comfortable stays, thoughtful service, and memorable experiences around the world."
      />

      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold max-w-[740px] mb-[72px]">
          Loved by <span className="text-blue-600">30k+</span> happy travelers
          worldwide
        </h1>

        <div className="flex flex-wrap items-stretch justify-center gap-4">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="flex flex-col items-center bg-white px-5 py-8 rounded-lg border border-gray-300/80 w-full sm:w-[272px] text-sm text-center text-gray-500"
            >
              <img
                className="h-16 w-16 rounded-full object-cover mb-4"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <p className="flex-1">“{testimonial.review}”</p>
              <p className="text-lg text-gray-800 font-medium mt-5">
                {testimonial.name}
              </p>
              <p className="text-xs mt-1">{testimonial.address}</p>
              <div
                className="flex items-center gap-1 mt-2"
                aria-label={`${testimonial.rating} out of 5 stars`}
              >
                <StarRating rating={testimonial.rating} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
