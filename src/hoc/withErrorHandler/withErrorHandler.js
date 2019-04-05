import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios)=>{
	return class extends Component {
		constructor(props){
			super(props);

			this.state = {
				error: null
			}

			this.reqInterceptor = axios.interceptors.request.use(req=>{
				this.setState({error: null});
				return req;
			}, error=>{
				this.setState({error});
			});

			this.resInterceptor = axios.interceptors.response.use(res=>res, error=>{
				this.setState({error});
			});
		}

		componentWillUnmount(){
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.response.eject(this.resInterceptor);

			console.log("componentWillUnmount, eject the interceptors");
		}

		componentDidUpdate(){
		}

		componentDidMount(){
			// It run at last in the lifecycle
			// the axios.interceptors are not put here
			// because it is too late to intercept the initial errors
		}

		errorConfirmedHandler = () => {
			this.setState({error: null});
		}

		render(){
			return (
				<>
					<Modal
						show={this.state.error}
						backdropClicked={this.errorConfirmedHandler}
					>
						{this.state.error ? this.state.error.message : null }
					</Modal>
					<WrappedComponent {...this.props} />
				</>
			)
		}
	}
}

export default withErrorHandler;

