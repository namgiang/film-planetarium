import PropTypes from 'prop-types';

export const Actor = PropTypes.shape({
    name: PropTypes.string,
    color: PropTypes.string,
    times: PropTypes.number
});

export const ActorCircleItem = PropTypes.shape({
    actors: PropTypes.arrayOf(Actor),
    className: PropTypes.string, 
    color: PropTypes.string, 
    itemCount: PropTypes.number
});