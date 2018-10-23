import PropTypes from 'prop-types';

export const Director = PropTypes.shape({
    name: PropTypes.string,
    born: PropTypes.number, 
    label: PropTypes.string
});