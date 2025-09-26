import React, { Component } from "react";
import { Grid, Typography, Card, CardContent } from "@material-ui/core";
import Chart from "react-google-charts";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import {
   formatMessage,
 } from "@openimis/fe-core";
import { bindActionCreators } from "redux";
import { fetchAllAnalytics } from "../action";
import Shimmer from "../components/Shimmer";

const MetricCard = ({ title, value }) => (
  <Card style={{ height: '100%' }}>
    <CardContent>
      <Typography color="textSecondary" gutterBottom>{title}</Typography>
      <Typography variant="h4">{value?.toLocaleString() ?? 'N/A'}</Typography>
    </CardContent>
  </Card>
);

const ChartCard = ({ title, chartType, data, options }) => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      {data && data.length > 1 ? (
        <Chart
          width="100%"
          height="350px"
          chartType={chartType}
          loader={<Shimmer />}
          data={data}
          options={{ ...options, chartArea: { width: "80%", height: "70%" } }}
        />
      ) : (
        <Typography>No data available for this chart.</Typography>
      )}
    </CardContent>
  </Card>
);

class AnalyticsDashboard extends Component {
  componentDidMount() {
    this.props.fetchAllAnalytics();
  }

  render() {
    const { analyticsState } = this.props;
    const { fetching, fetched, error } = analyticsState;

    if (fetching) {
      return (
        <Grid container spacing={3}>
          {[...Array(8)].map((_, i) => (
            <Grid item xs={12} sm={6} key={i}><Shimmer /></Grid>
          ))}
        </Grid>
      );
    }

    if (error) {
      return <Typography color="error">Error: {error.message || 'Could not fetch analytics data.'}</Typography>;
    }

    if (!fetched || !analyticsState || !analyticsState.dashboardMetrics || !analyticsState.generalAnalytics) {
      return null;
    }

    const {
      dashboardMetrics,
      generalAnalytics,
      geospatialAnalytics,
      epidemiologicalAnalytics,
      customerJourneyAnalytics,
    } = analyticsState;

    return (
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>{formatMessage(this.props.intl, "dashboard", "dashboard.Title")}</Typography>
        </Grid>
        <Grid item xs={6} sm={3}><MetricCard title="Claims Entered" value={dashboardMetrics.claimsEntered} /></Grid>
        <Grid item xs={6} sm={3}><MetricCard title="Claims Pending" value={dashboardMetrics.claimsPending} /></Grid>
        <Grid item xs={6} sm={3}><MetricCard title="Claims Processed" value={dashboardMetrics.claimsProcessed} /></Grid>
        <Grid item xs={6} sm={3}><MetricCard title="Claims Rejected" value={dashboardMetrics.claimsRejected} /></Grid>

        {/* Section 2: General Analytics */}
        <Grid item xs={12} md={6}>
          <ChartCard
            title="Top Recommended Claims"
            chartType="BarChart"
            data={[["Claim", "Amount"], ...(generalAnalytics.topRecommendedClaims || []).map(c => [c.claimCode, c.claimedAmount])]}
            options={{ hAxis: { title: 'Claimed Amount' }, vAxis: { title: 'Claim' }, legend: 'none' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartCard
            title="Total Claimed Amount by Facility"
            chartType="ColumnChart"
            data={[["Facility", "Total Amount"], ...(generalAnalytics.totalClaimedByHealthFacility || []).map(f => [f.healthFacilityName, f.totalClaimedAmount])]}
            options={{ hAxis: { title: 'Health Facility', slantedText: true, slantedTextAngle: 45 }, vAxis: { title: 'Total Claimed Amount' }, legend: 'none' }}
          />
        </Grid>

        {/* Section 3: Epidemiological & Geospatial */}
        <Grid item xs={12} md={6}>
          <ChartCard
            title="Top 10 Diseases by Claim Volume"
            chartType="PieChart"
            data={[["Disease", "Number of Claims"], ...(epidemiologicalAnalytics.topClaimedDiseasesByVolume || []).map(d => [d.icdName, d.claimCount])]}
            options={{ is3D: true }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartCard
            title="Claim Count by Province"
            chartType="PieChart"
            data={[["Province", "Claim Count"], ...(geospatialAnalytics.claimSummaryByProvince || []).map(p => [p.regionName, p.claimCount])]}
          />
        </Grid>

        {/* Section 4: Trends and Funnels */}
        <Grid item xs={12}>
          <ChartCard
            title="Overall Claim Trend by Month"
            chartType="LineChart"
            data={[["Month", "Claims"], ...(epidemiologicalAnalytics.overallClaimTrend || []).map(t => [new Date(t.month), t.claimCount])]}
            options={{ hAxis: { title: 'Month' }, vAxis: { title: 'Number of Claims' }, legend: 'none' }}
          />
        </Grid>
        <Grid item xs={12}>
          <ChartCard
              title="Claim Lifecycle Funnel"
              chartType="ColumnChart"
              data={[["Stage", "Claim Count"], ...(customerJourneyAnalytics.claimLifecycleFunnel || []).map(s => [s.stageName, s.claimCount])]}
              options={{ hAxis: { title: 'Stage' }, vAxis: { title: 'Claim Count' }, legend: 'none' }}
          />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  analyticsState: state.dashboard, 
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchAllAnalytics }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AnalyticsDashboard));