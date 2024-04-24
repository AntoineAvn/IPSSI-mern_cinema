import React from 'react';
import PropTypes from 'prop-types';

const HomeComponent = ({data}) => {
    return (
        <div>
                {
                    data.length > 0
                        ?
                        data.map((elms, idx) =>
                            <div key={elms._id}>
                                {elms.username}
                            </div>)
                        :
                        <p>Aucune données</p>
                }
        </div>
    );
};

HomeComponent.propTypes = {
    data: PropTypes.array.isRequired,
};

export default HomeComponent;
