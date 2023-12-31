import PropTypes from "prop-types";
import { styled } from "styled-components"
import Icon from '../component/Icon'

const MapBtnContainer = styled.div`
    position: fixed;
    display: flex;

    left: 94%;
    top: 100px;
    width: 70px;
    height: 250px;

    z-index: 20;
`

const StyledIcon = styled.div`
    svg {
        display: flex;
        align-items: center;
    }
`;

const SingleButtonGroup = styled.div`
    width: 50px;
    height: 50px;
    
    background-color: #FFFFFF;

    border-radius: 100px;
    border-style: solid;
    border-width: 2px;
    border-color: #BBBBBB;

    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.5);

    display: flex;
    justify-content: center;
    align-items: center;
`;

const DoubleButtonGroup = styled.div`
    width: 50px;
    height: 120px;
    
    background-color: #FFFFFF;

    border-radius: 100px;
    border-style: solid;
    border-width: 2px;
    border-color: #BBBBBB;

    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.5);

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`;

const Space = styled.div`
    height: 10px;
`

const MapBtnInputButton = styled.button`
`;

const MapButton = (props) => {
    const {zoomIn, zoomOut, refreshLocation, updateCurrentPos} = props;
    
    return <MapBtnContainer>
        <StyledIcon>
            <SingleButtonGroup>
                <MapBtnInputButton onClick={updateCurrentPos}><Icon.Gps width="24px" height="24px"/></MapBtnInputButton>
            </SingleButtonGroup>
            <Space/>
            <SingleButtonGroup>
                <MapBtnInputButton onClick={refreshLocation}><Icon.Refresh width="22px" height="20px"/></MapBtnInputButton>
            </SingleButtonGroup>
            <Space/>
            <DoubleButtonGroup>
                <MapBtnInputButton onClick={zoomIn}>
                    <Icon.Increase width="20px" height="20px"/>
                </MapBtnInputButton>
                <MapBtnInputButton onClick={zoomOut}>
                    <Icon.Decrease width="20px" height="20px"/>
                </MapBtnInputButton>
            </DoubleButtonGroup>         
        </StyledIcon>
    </MapBtnContainer>
}


MapButton.propTypes = {
    zoomIn: PropTypes.func,
    zoomOut: PropTypes.func,
    refreshLocation: PropTypes.func,
    updateCurrentPos: PropTypes.func,
};
  
MapButton.defaultProps = {
    zoomIn: () => {},
    zoomOut: () => {},
    refreshLocation: () => {},
    updateCurrentPos: () => {},
};

export default MapButton;