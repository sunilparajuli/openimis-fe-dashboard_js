import { graphql } from "@openimis/fe-core";

export function fetchAllAnalytics() {
  const payload = `
    query {
      dashboard {
        # Claim Processing Status
        claimsEntered
        claimsChecked
        claimsProcessed
        claimsValuated
        claimsRejected
        claimsPending

        # Healthcare Service Types
        inpatientClaims
        outpatientClaims
        emergencyVisits
        routineVisits
        referralClaims

        # Health Facility Levels
        primaryCareClaims
        secondaryCareClaims
        tertiaryCareClaims
        specializedCareClaims

        # Financial Metrics
        totalClaimedAmount
        totalApprovedAmount
        averageClaimValue
        highValueClaims

        # Quality Indicators
        claimsWithFeedback
        claimsRequiringReview
        claimsWithAttachments
        preAuthorizedClaims

        # Time-based Metrics
        claimsThisMonth
        claimsLastMonth
        processingEfficiencyRate
      }

      analytics {
        topRecommendedClaims {
          claimId
          claimCode
          claimedAmount
          healthFacilityName
        }
        totalClaimedByHealthFacility {
          healthFacilityName
          totalClaimedAmount
        }
      }

      geospatialAnalytics {
        claimSummaryByProvince {
          regionName
          claimCount
        }
      }

      epidemiologicalAnalytics {
        topClaimedDiseasesByVolume {
          icdName
          claimCount
        }
        overallClaimTrend {
          month
          claimCount
        }
      }

      customerJourneyAnalytics {
        claimLifecycleFunnel {
          stageName
          claimCount
        }
      }
    }
  `;

  return graphql(payload, "FETCH_ALL_ANALYTICS");
}
