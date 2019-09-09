import React from "react";
const BusinessDetailComponent = (props) => {
        return (
            <React.Fragment>
                <p><b>Name:</b> {props.item.name}</p>
                <p><b>Address:</b> {props.item.address}</p>
                <p><b>Review:</b> {props.item.review}</p>
                <p><b>Reviewer:</b> {props.item.reviewer}</p>
            </React.Fragment>
        );
}
export default BusinessDetailComponent;