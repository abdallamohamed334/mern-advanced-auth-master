import { motion } from "framer-motion";

const VenueCard = ({ venue, onVenueClick, onBookNow }) => {
  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-sm ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
        <span className="text-gray-600 text-sm mr-1">({rating})</span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden cursor-pointer transition-all h-full flex flex-col hover:border-purple-300 hover:shadow-lg"
      onClick={() => onVenueClick(venue)}
    >
      <VenueImage venue={venue} renderStars={renderStars} />
      
      <div className="p-4 flex-grow flex flex-col">
        <VenueInfo venue={venue} />
        <VenueFeatures venue={venue} />
        <VenueActions 
          venue={venue} 
          onVenueClick={onVenueClick}
          onBookNow={onBookNow}
        />
      </div>
    </motion.div>
  );
};

const VenueImage = ({ venue, renderStars }) => (
  <div className="relative h-48 flex-shrink-0">
    <img 
      src={venue.image} 
      alt={venue.name}
      className="w-full h-full object-cover"
    />
    {!venue.available && (
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
        <span className="text-white font-bold bg-red-600 px-4 py-2 rounded-full">
          مش متاحة
        </span>
      </div>
    )}
    <div className="absolute top-4 left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
      {venue.price.toLocaleString()} جنيه
    </div>
    <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded text-xs">
      {venue.city}
    </div>
    <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded">
      {renderStars(venue.rating)}
    </div>
  </div>
);

const VenueInfo = ({ venue }) => (
  <div className="flex justify-between items-start mb-2">
    <h4 className="text-lg font-bold text-gray-900">{venue.name}</h4>
    <span className="text-purple-600 text-sm bg-purple-50 px-2 py-1 rounded">
      {venue.capacity} شخص
    </span>
  </div>
);

const VenueFeatures = ({ venue }) => (
  <>
    <p className="text-gray-600 text-sm mb-3">{venue.city}، {venue.governorate}</p>
    <div className="flex flex-wrap gap-1 mb-4 flex-grow">
      {venue.features?.slice(0, 3).map((feature, index) => (
        <span
          key={index}
          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
        >
          {feature}
        </span>
      ))}
      {venue.features?.length > 3 && (
        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
          +{venue.features.length - 3} أكتر
        </span>
      )}
    </div>
  </>
);

const VenueActions = ({ venue, onVenueClick, onBookNow }) => (
  <div className="mt-auto flex gap-2">
    <button 
      onClick={(e) => {
        e.stopPropagation();
        onVenueClick(venue);
      }}
      className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors"
    >
      شوف التفاصيل
    </button>
    <button 
      onClick={(e) => {
        e.stopPropagation();
        onBookNow(venue);
      }}
      disabled={!venue.available}
      className={`flex-1 py-2 rounded-lg font-medium text-sm transition-colors ${
        venue.available 
          ? 'bg-green-600 hover:bg-green-700 text-white' 
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
      }`}
    >
      احجز الآن
    </button>
  </div>
);

export default VenueCard;