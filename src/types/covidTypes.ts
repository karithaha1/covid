export interface CovidDataItem {
  publishdate: string;
  totalScreeningAirlines: number;
  totalScreeningAirlinePassengers: number;
  totalScreeningShips: number;
  totalScreeningShipPassengers: number;
  totalScreeningBorder: number;
  totalScreeningImmigration: number;
  totalAirlinesAndShipsPUI: number;
  totalPUI: number;
  totalAirlinePUI: number;
  totalShipPUI: number;
  totalHospitalPUI: number;
  totalPrivateHospital: number;
  totalPublicHospital: number;
  totalOtherPUI: number;
  totalBKKAirportPUI: number;
  totalDMKAirportPUI: number;
  totalHKTAirportPUI: number;
  totalCNXAirportPUI: number;
  totalURTAirportPUI: number;
  totalUBPAirportPUI: number;
  totalUTPAirportPUI: number;
  totalUTHAirportPUI: number;
  totalCases: number;
  totalRecovered: number;
  currentlyInfectedPatients: number;
  totalDeaths: number;
  currentlySeriousOrCritical: number;
  totalTests: number;
  newCases: number;
  newDeaths: number;
  newPUI: number;
  newRecovered: number;
  newSeriousOrCritical: number;
  newInfectedPatients: number;
  newTests: number;
  totalPUIPercent: number;
  newCasesPercent: number;
  totalCasesPercent: number;
  totalRecoveredPercent: number;
  totalDeathsPercent: number;
  totalTestsPercent: number;
  currentlySeriousOrCrititalPercent: number;
  currentlyInfectedPatientsPercent: number;
  currentlyInfectedPatientsCapacityPercent: number;
}

export interface CovidStateData {
  count: number;
  last_update: string;
  results: CovidDataItem[];
}

export interface CovidState {
  data: CovidStateData | null;
  loading: boolean;
  error: string | null;
}
