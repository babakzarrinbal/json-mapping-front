export default {
  configuration: {
    eventGroups: [
      {
        eventGroupLabel: "CALLS",
        unit: "HHMMSS",
        derivedEventIds: [
          {
            eventName: "nationalCalls",
            derivedEventId: "613b93a2-535e-44bd-8668-e386625caf89",
            serviceDetailsSection: "off-net National Calls",
            itemizedSummery: "totalUsage"
          },
          {
            eventName: "nationalCalls",
            derivedEventId: "2170f430-374d-4f02-9a19-7fc7603bdca1",
            serviceDetailsSection: "",
            itemizedSummery: ""
          },
          {
            eventName: "nationalCalls",
            derivedEventId: "e15404fe-1002-4f13-aee0-19e11c516e09",
            serviceDetailsSection: "",
            itemizedSummery: ""
          }
        ]
      },
      {
        eventGroupLabel: "SMS",
        unit: "HHMMSS",
        derivedEventIds: [
          {
            eventName: "nationalCalls",
            derivedEventId: "c3ed6e52-18e9-43fe-9f5d-7c13ccb5d720",
            serviceDetailsSection: "on-net National Calls",
            itemizedSummery: "totalUsage"
          },
          
        ]
      }
    ],
    discountGroups: [
      {
        discountGroupLabel: "5 Percent Corporate Discount",
        discountIds: [
          {
            chargeId: "945fa7db-d74e-4c3b-baa5-b16fc8aeb8c1",
            serviceDetailsSection: "5 Percent"
          }
        ]
      }
    ],
    recurringChargesGroups: [
      {
        recurringChargeGroupLabel: "GSM recurring",
        offeringId: "12573a1b-9455-4a20-9048-0474a1b86698",
        chargeIds: [
          {
            chargeId: "aab955b2-7b1f-4f44-a9b7-e6f78b0e4d8a",
            serviceDetailsSection: ""
          }
        ]
      },
      {
        recurringChargeGroupLabel: "LTE TDD recurring",
        offeringId: "aa915db2-7b1f-4f44-a9b7-e6f78b0e9789",
        chargeIds: [
          {
            chargeId: "aa915db2-7b1f-4f44-a9b7-e6f78b0e4789",
            serviceDetailsSection: ""
          }
        ]
      },
      {
        recurringChargeGroupLabel: "Muultiplay OneTime565",
        offeringId: " 9fb74bce-7b62-4207-b11a-5d8ac8c56077",
        chargeIds: [
          {
            chargeId: " 0efb14bb-02f2-4f0e-90ae-7a7d31f52999",
            serviceDetailsSection: ""
          }
        ]
      },
      {
        recurringChargeGroupLabel: "Muultiplay OneTime575",
        offeringId: "1524ec00-4912-4627-902b-3fe3a563fb78",
        chargeIds: [
          {
            chargeId: "0efb14bb-02f2-4f0e-90ae-7a7d31f52999",
            serviceDetailsSection: ""
          }
        ]
      },
      {
        recurringChargeGroupLabel: "Muultiplay RecurringMitra2",
        offeringId: " 524742cb-2bc4-4e0d-a167-a2dfb97550af",
        chargeIds: [
          {
            chargeId: " 0efb14bb-02f2-4f0e-90ae-7a7d31f52999",
            serviceDetailsSection: ""
          }
        ]
      },
      {
        recurringChargeGroupLabel: "MuutiPlay recurring charge",
        offeringId: "aab95db2-7b1f-4144-a9b7-e6f78b0e5678",
        chargeIds: [
          {
            chargeId: "aab955b2-7b1f-4f44-a9b7-e6f78b0e4d8a",
            serviceDetailsSection: ""
          }
        ]
      },
      {
        recurringChargeGroupLabel: "Special Tariff",
        offeringId: "12573a1b-fc7b-4a20-9048-0474a1986698",
        chargeIds: [
          {
            chargeId: "aab955b2-7b1f-4f44-a9b7-e6f78b0e4d8a",
            serviceDetailsSection: "Digital services"
          }
        ]
      },
      {
        recurringChargeGroupLabel: "Special Tariff Corporate",
        offeringId: "12573a1b-fc7b-4a20-9048-0474a1b866a1",
        chargeIds: [
          {
            chargeId: "aab955b2-7b1f-4f44-a9b7-e6f78b0e4d8a",
            serviceDetailsSection: ""
          }
        ]
      },
      {
        recurringChargeGroupLabel: "Special Tariff Retail",
        offeringId: "12573a1b-fc7b-4a20-9048-0474a1b86698",
        chargeIds: [
          {
            chargeId: "aab955b2-7b1f-4f44-a9b7-e6f78b0e4d8a",
            serviceDetailsSection: ""
          }
        ]
      },
      {
        recurringChargeGroupLabel: "WS Reental",
        offeringId: "12573a1b-9876-4a20-9048-4567a1986698",
        chargeIds: [
          {
            chargeId: "aab955b2-7b1f-4f44-a9b7-e6f78b0e4d8a",
            serviceDetailsSection: ""
          }
        ]
      }
    ],
    oneTimeChargesGroups: [
      {
        oneTimeChargeGroupLabel: "Bolton onetime",
        offeringId: "12375892-4839-4144-a9b7-e6f78b0e4d8a",
        chargeIds: [
          {
            chargeId: "aab95db2-7b1f-4144-a9b7-e6f78b0e4d8a",
            callType: "boltOn",
            serviceDetailsSection: "Primary Bolton"
          }
        ]
      },
      {
        oneTimeChargeGroupLabel: "equipment onetimecharge",
        offeringId: "12573a1b-fc7b-4a20-9048-0474a1986698",
        chargeIds: [
          {
            chargeId: "aab95db2-7b1f-4144-a9b7-e6f78b0e4d8a",
            callType: "",
            serviceDetailsSection: "equipment charge"
          }
        ]
      },
      {
        oneTimeChargeGroupLabel: "Insurance Charges",
        offeringId: "12573a1b-fc7b-9876-9048-0474a1986698",
        chargeIds: [
          {
            chargeId: "aab95db2-7b1f-4144-a9b7-e6f78b0e4d8a",
            callType: "",
            serviceDetailsSection: ""
          }
        ]
      },
      {
        oneTimeChargeGroupLabel: "Muultiplay OneTime",
        offeringId: "d8596a17-fda7-45bc-84dc-a3d1335fe6a4",
        chargeIds: [
          {
            chargeId: "7dd4e8b2-e9cb-4e36-adac-e50e485abe44",
            callType: "",
            serviceDetailsSection: ""
          }
        ]
      },
      {
        oneTimeChargeGroupLabel: "Muultiplay OneTime1",
        offeringId: "2e945a9b-f961-40e2-826f-4b4fddd95d54",
        chargeIds: [
          {
            chargeId: "7dd4e8b2-e9cb-4e36-adac-e50e485abe44",
            callType: "",
            serviceDetailsSection: ""
          }
        ]
      },
      {
        oneTimeChargeGroupLabel: "Muultiplay OneTime3",
        offeringId: "80c3a3c4-b772-489c-a7a6-f04c8b0f63ab",
        chargeIds: [
          {
            chargeId: "7dd4e8b2-e9cb-4e36-adac-e50e485abe44",
            callType: "",
            serviceDetailsSection: ""
          }
        ]
      },
      {
        oneTimeChargeGroupLabel: "Muultiplay OneTimeMitra",
        offeringId: " 524742cb-2bc4-4e0d-a167-a2dfb97550af",
        chargeIds: [
          {
            chargeId: " 7dd4e8b2-e9cb-4e36-adac-e50e485abe44",
            callType: "",
            serviceDetailsSection: ""
          }
        ]
      },
      {
        oneTimeChargeGroupLabel: "Muultiplay OneTimeMitra1",
        offeringId: " 524742cb-2bc4-4e0d-a167-a2dfb97550af",
        chargeIds: [
          {
            chargeId: " 7dd4e8b2-e9cb-4e36-adac-e50e485abe44",
            callType: "",
            serviceDetailsSection: ""
          }
        ]
      },
      {
        oneTimeChargeGroupLabel: "Muuti Play onetime charge",
        offeringId: "aab95db2-7b1f-4144-a9b7-e6f78b0e5678",
        chargeIds: [
          {
            chargeId: "aab95db2-7b1f-4144-a9b7-e6f78b0e4d8a",
            callType: "",
            serviceDetailsSection: ""
          }
        ]
      },
      {
        oneTimeChargeGroupLabel: "Roaming Deposit",
        offeringId: "b5410d0a-e77e-11e9-81b4-2a2ae2dbcce8",
        chargeIds: [
          {
            chargeId: "0b97a550-7f2b-489b-9d95-9b32714656cf",
            callType: "",
            serviceDetailsSection: ""
          }
        ]
      },
      {
        oneTimeChargeGroupLabel: "Roaming DepositOP",
        offeringId: "b5410d0a-e77e-11e9-81b4-2a2ae2dbcce6",
        chargeIds: [
          {
            chargeId: "0b97a550-7f2b-489b-9d95-9b32714656cf",
            callType: "",
            serviceDetailsSection: ""
          }
        ]
      },
      {
        oneTimeChargeGroupLabel: "Security Deposit",
        offeringId: "12573a1b-fc7b-9874-9048-0474a1986698",
        chargeIds: [
          {
            chargeId: "aab95db2-7b1f-4144-a9b7-e6f78b0e4d8a",
            callType: "",
            serviceDetailsSection: ""
          }
        ]
      },
      {
        oneTimeChargeGroupLabel: "Standard deposit",
        offeringId: "b5410d0a-e77e-11e9-81b4-2a2ae2dbcce4",
        chargeIds: [
          {
            chargeId: "0b97a550-7f2b-489b-9d95-9b32714656bf",
            callType: "",
            serviceDetailsSection: ""
          }
        ]
      },
      {
        oneTimeChargeGroupLabel: "Standard depositOP",
        offeringId: "b5410d0a-e77e-11e9-81b4-2a2ae2dbcce5",
        chargeIds: [
          {
            chargeId: "0b97a550-7f2b-489b-9d95-9b32714656bf",
            callType: "",
            serviceDetailsSection: ""
          }
        ]
      },
      {
        oneTimeChargeGroupLabel: "Static IP Charges",
        offeringId: "12573a1b-fc7b-9871-9048-0474a1986698",
        chargeIds: [
          {
            chargeId: "aab95db2-7b1f-4144-a9b7-e6f78b0e4d8a",
            callType: "",
            serviceDetailsSection: ""
          }
        ]
      },
      {
        oneTimeChargeGroupLabel: "WS security",
        offeringId: "12573a1b-9876-4a20-9048-4567a1986698",
        chargeIds: [
          {
            chargeId: "212f3fcf-bfb9-480d-9d6e-f54e01f5fbc3",
            callType: "",
            serviceDetailsSection: ""
          }
        ]
      },
      {
        oneTimeChargeGroupLabel: "5GOneTime",
        offeringId: "4b04493f-c878-42a3-93fc-e30542829967",
        chargeIds: [
          {
            chargeId: "19b71e12-4ccf-4161-89f3-5b512a0a372c",
            callType: "",
            serviceDetailsSection: ""
          }
        ]
      }
    ],
    upfrontPaymentChargesGroups: [
      {
        upfrontGroupLabel: "Bolton onetime",
        offeringId: "13000000-0000-0000-0000-000000000010",
        chargeIds: [
          {
            chargeId: "50000000-0000-0000-0000-000000000003",
            callType: "serviceDetails"
          }
        ]
      },
      {
        upfrontGroupLabel: "LTEEquipmentFee",
        offeringId: "12573900-fc7b-9876-9048-0474a1986698",
        chargeIds: [
          {
            chargeId: "aab95db2-7b1f-4144-a9b7-e6f78b0e4d8a",
            callType: "boltOn"
          }
        ]
      },
      {
        upfrontGroupLabel: "upfrontPayment",
        offeringId: "13000000-0000-0000-0000-000000000010",
        chargeIds: [
          { chargeId: "50000000-0000-0000-0000-000000000002", callType: "" }
        ]
      }
    ],
    undefinedLabels: {
      eventGroupLabel: "eventGroupLabel",
      eventLabel: "eventLabel",
      itemizedCallLabel: "itemizedCallLabel",
      oneTimeChargeGroupLabel: "oneTimeCharges",
      recurringChargeGroupLabel: "recurringCharges",
      upfrontPaymentGroupLabel: "upfrontPayment"
    },
    taxGroups: [
      {
        taxName: "9 percent Tax",
        taxPlanFormulaIDs: [
          {
            chargeId: "aa915db2-7b1f-4f44-a9b7-e6f78b0e4d8a",
            serviceDetailsSection: ""
          },
          {
            chargeId: "aab15db2-7b1f-4f44-a9b7-e6f78b0e4d8a",
            serviceDetailsSection: "9 PercentTax"
          }
        ]
      }
    ],
    OneTimeChargeEvents: {},
    fixFloatingDigit: "3",
    ConsumerGroupName: "bill-enricher",
    NGB_NotificationTopic: "ngb_billing_run_notifications",
    EnrichedNotificationTopic: "enricher_notifications",
    EnrichedInvoiceTopicPrefix: "enricher_invoices_",
    InvoiceAmountExclusionCriteria: "0.0",
    enrichExcludedAccountTopic: "ngb_pdfs_for_excluded_accounts",
    enrichedExcludedInvoiceTopicPrefix: "enricher_excluded_invoices_",
    ServiceAccountExclusionCriteria: "0.0",
    billingSummeryGroup: {
      chargeDetails: [
        "CALLS",
        "Muuti Play onetime charge",
        "MuutiPlay recurring charge",
        "GSM recurring",
        "LTE TDD recurring",
        "Special Tariff Retail",
        "Special Tariff Corporate",
        "Special Tariff",
        "equipment onetimecharge",
        "WS Reental",
        "WS security",
        "Static IP Charges",
        "Insurance Charges",
        "Security Deposit",
        "Bolton onetime",
        "recurringCharges",
        "oneTimeCharges",
        "eventGroupLabel",
        "eventLabel",
        "Muultiplay OneTime",
        "Muultiplay OneTime1",
        "Muultiplay OneTime3",
        "Muultiplay OneTimeMitra",
        "Muultiplay OneTimeMitra1",
        "Muultiplay RecurringMitra2",
        "Muultiplay OneTime575",
        "Standard deposit",
        "Standard depositOP",
        "Roaming DepositOP",
        "Roaming Deposit",
        "Muultiplay OneTime565"
      ],
      taxAndOthers: [
        "5 Percent Corporate Discount",
        "9 percent Tax",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        "totalPreviousBalance"
      ]
    },
    itemizedBillGroup: [
      { mapping: "taxAndDiscounts", value: "5 Percent Corporate Discount" },
      { mapping: "taxAndDiscounts", value: "9 percent Tax" },
      { mapping: "purchasingPackages", value: "Bolton onetime" },
      { mapping: "calls", value: "CALLS" },
      { mapping: "subscriptionFee", value: "equipment onetimecharge" },
      { mapping: "subscriptionFee", value: "Muuti Play onetime charge" },
      { mapping: "installments", value: "MuutiPlay recurring charge" },
      { mapping: "vas", value: "Special Tariff" },
      { mapping: "installments", value: "WS security" }
    ],
    roundOfGroup: {
      displayLabel: "Rials round down",
      checkValue: "L",
      roundOfValue: "1000"
    }
  }
};
