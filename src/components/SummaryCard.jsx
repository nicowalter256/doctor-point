import React from 'react';
import PropTypes from 'prop-types';

const SummaryCard = ({ title, number, icon, iconBgColor }) => {
  return (
    <div
      className="overflow-hidden bg-white rounded-lg shadow-md"
      role="region"
      aria-label={title}
    >
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <div className={`p-6 rounded-lg ${iconBgColor}`}>{icon}</div>
          </div>
          <div>
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="pt-5 text-2xl font-bold text-right text-gray-800">
                {number}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

SummaryCard.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.element.isRequired,
  iconBgColor: PropTypes.string,
};

export default SummaryCard;