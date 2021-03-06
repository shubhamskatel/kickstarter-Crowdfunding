import React, { Component } from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/Contribute";
import { Link } from "../../routes";

class CampaignShow extends Component {
	static async getInitialProps(props) {
		const campaign = Campaign(props.query.address);

		const summary = await campaign.methods.getSummary().call();

		return {
			address: props.query.address,
			minimumContribution: summary[0],
			balance: summary[1],
			requestsCount: summary[2],
			approversCount: summary[3],
			manager: summary[4],
		};
	}

	renderCards() {
		const {
			balance,
			manager,
			minimumContribution,
			requestsCount,
			approversCount,
		} = this.props;

		const items = [
			{
				header: manager,
				meta: "Address of the Manager",
				description: "This is the manager of the contract",
				style: { overflowWrap: "break-word" },
			},
			{
				header: minimumContribution,
				meta: "Minimum Contribution (wei)",
				description:
					"You must contribute alteast this much wei to contribute to the campaign",
				style: { overflowWrap: "break-word" },
			},
			{
				header: requestsCount,
				meta: "Number of requests",
				description:
					"Request to withdraw from the Campaign. It needs to be approved",
				style: { overflowWrap: "break-word" },
			},
			{
				header: approversCount,
				meta: "Number of Approvers",
				description:
					"Number of people who have already donated to the campaign",
				style: { overflowWrap: "break-word" },
			},
			{
				header: web3.utils.fromWei(balance, "ether"),
				meta: "Campaign Balance (ether)",
				description: "The balance is how much money this campaign has",
				style: { overflowWrap: "break-word" },
			},
		];

		return <Card.Group items={items} />;
	}

	render() {
		return (
			<Layout>
				<h1>Campaign Show</h1>

				<Grid>
					<Grid.Row>
						<Grid.Column width={10}>
							{this.renderCards()}
						</Grid.Column>

						<Grid.Column width={6}>
							<ContributeForm address={this.props.address} />
						</Grid.Column>
					</Grid.Row>

					<Grid.Row>
						<Grid.Column>
							<Link
								route={`/campaigns/${this.props.address}/requests`}
							>
								<a>
									<Button primary>View Requests</Button>
								</a>
							</Link>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Layout>
		);
	}
}

export default CampaignShow;
