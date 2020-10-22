import React from 'react';
import ImageComponent from '../Components/ImageComponent';
import VideoComponent from '../Components/VideoComponent';

export default class ParseContent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const apiRes = Array.from(this.props.apiRes)
        return apiRes.map((data, index) => {
            if (data.images) {
                if (data.is_album === true) {
                    if (data.images[0].link.match(/\.(jpg|png|gif)/g)) {
                        return (<ImageComponent
                            image={data.images[0]}
                            data={data}
                            key={'data' + index}
                            accessToken={this.props.accessToken}/>)
                    } else {
                        return (<VideoComponent
                            video={data.images[0]}
                            data={data}
                            key={'data' + index}
                            accessToken={this.props.accessToken}/>)
                    }
                } else {
                    return (<ImageComponent
                        image={data}
                        data={data}
                        key={'data' + index}/>)
                }
            } else {
                return (<VideoComponent
                    video={data}
                    data={data}
                    key={'data' + index}/>)
            }
        })
    }

}

/*




 */
