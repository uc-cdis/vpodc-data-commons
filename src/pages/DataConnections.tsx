import React from 'react';
import { Title, Table, Mark, Spoiler } from '@mantine/core';
import {
  NavPageLayout,
  NavPageLayoutProps,
  getNavPageLayoutPropsFromConfig,
} from '@gen3/frontend';
import { GetServerSideProps } from 'next';

const StatsPage = ({ headerProps, footerProps }: NavPageLayoutProps) => {
  const elements = [
    {
      "source": "VPODC",
      "cohortStudy": "Cohort A (RePOP)",
      "datatype": "Clinical OMOP CDM",
      "description": "Clinical OMOP CDM data from Veterans with lung, prostate and other cancers",
      "connectiontype": "ATLAS, PLP apps (VPODC)",
      "status": "[Established - Real Data]",
      "patients": "819 patients"
    },
    {
      "source": "VPODC",
      "cohortStudy": "Cohort A (RePOP)",
      "datatype": "Primary Oncology",
      "description": "Primary oncology data from Veterans with lung, prostate and other cancers",
      "connectiontype": "API (VPODC/MC2DP explorer, select variables)",
      "status": "[Established - Real Data]",
      "patients": "784 patients"
    },
    {
      "source": "VPODC",
      "cohortStudy": "Cohort A (RePOP)",
      "datatype": "Genomics",
      "description": "Genomics (Annotated DNA somatic mutation VCFs)",
      "connectiontype": "API",
      "status": "[Established - Real Data]",
      "patients": "142 VCFs"
    },
    {
      "source": "VPODC",
      "cohortStudy": "Cohort A (RePOP)",
      "datatype": "Imaging",
      "description": "Imaging (JPEG, DICOM)",
      "connectiontype": "API",
      "status": "[Established - Real Data]",
      "patients": "211,244 Imaging Files / 41 patients"
    },
    {
      "source": "VPODC",
      "cohortStudy": "Cohort B",
      "datatype": "Clinical OMOP CDM",
      "description": "Clinical OMOP CDM data from deceased Veterans with primarily prostate and respiratory cancers (bronchus and lung)",
      "connectiontype": "ATLAS, PLP apps (VPODC)",
      "status": "[Established - Real Data]",
      "patients": "163,474 patients"
    },
    {
      "source": "VPODC",
      "cohortStudy": "Cohort B",
      "datatype": "Genomics",
      "description": "Genomics (Annotated DNA somatic mutation VCFs)",
      "connectiontype": "API",
      "status": "[Established - Real Data]",
      "patients": "869 VCFs"
    },
    {
      "source": "VPODC",
      "cohortStudy": "Cohort B",
      "datatype": "Imaging",
      "description": "Imaging (MRI, JPEG)",
      "connectiontype": "API",
      "status": "[Established - Real Data]",
      "patients": "24,133 Imaging Files / 6 patients"
    },
    {
      "source": "VPODC",
      "cohortStudy": "Cohort F (VABio Legacy/APOLLO 5 cohort)",
      "datatype": "Clinical OMOP CDM",
      "description": "Clinical OMOP CDM data from Veterans with kidney, prostate and other carcinomas. A subset of individuals are in the RCC pilot.",
      "connectiontype": "ATLAS, PLP apps (VPODC)",
      "status": "[Established - Real Data]",
      "patients": "348 patients"
    },
    {
      "source": "VPODC",
      "cohortStudy": "Cohort F (VABio Legacy/APOLLO 5 cohort)",
      "datatype": "Primary Oncology",
      "description": "Primary oncology data from Veterans with kidney, prostate and other carcinomas.",
      "connectiontype": "API (VPODC/MC2DP explorer, select variables)",
      "status": "[Established - Real Data]",
      "patients": "314 patients"
    },
    {
      "source": "VPODC",
      "cohortStudy": "Cohort F (VABio Legacy/APOLLO 5 cohort)",
      "datatype": "Genomics",
      "description": "Genomics (Annotated DNA somatic mutation VCFs, Copy number variants, RNA expression, Germline VCFs)",
      "connectiontype": "Secure workspace",
      "status": "[Established - Real Data]",
      "patients": "49 patients"
    },
    {
      "source": "VPODC",
      "cohortStudy": "Cohort F (VABio Legacy/APOLLO 5 cohort)",
      "datatype": "Epidemiology",
      "description": "Epidemiology/Questionnaire",
      "connectiontype": "Secure workspace (select variables)",
      "status": "[Established - Real Data]",
      "patients": "534 patients"
    },
    {
      "source": "VPODC",
      "cohortStudy": "Cohort F (VABio Legacy/APOLLO 5 cohort)",
      "datatype": "Imaging",
      "description": "Imaging (DICOM)",
      "connectiontype": "API",
      "status": "[Established - Real Data]",
      "patients": "148,644 Imaging Files / 35 patients"
    },
    {
      "source": "VPODC",
      "cohortStudy": "Cohort F, Renal Cell Carcinoma (RCC) pilot",
      "datatype": "Entire Cohort F contains: Clinical OMOP CDM (n=348), Primary Oncology (n = 314), Epidemiology (n = 534), Genomics (n = 49),RCC cohort (n = 23)",
      "description": "Longitudinal clinical EHR data in the OMOP CDM format for all Veterans in Cohort F. This includes RCC and non-RCC cases. For RCC,  clear cell kidney adenocarcinomas, papillary or mixed cell kidney adenocarcinomas, and kidney renal cell carcinomas including chromophobe type are represented, Primary Oncology data for all Veterans in cohort F, including RCC and non-RCC cases. This dataset contains specific Histology diagnosis based on ICDO3X, Primary site, Date of Diagnosis, tumor morphology, surgery and treatment details among others. Targeted variables based on HistologyICDO3X, Primary site and Date of Diagnosis used for RCC pilot analysis, focusing only on the cohort with RCC, Epidemiology questionnaire data for all Veterans in cohort F, including RCC and non-RCC cases.  Exposure information on smoking, alcohol, military exposures and miliary branch association used for RCC pilot analysis, focusing on epidemiology data specific to RCC cohort, Genomics data is whole genome sequencing data, processed using DRAGEN pipeline. Data consists of somatic DNA mutations (MAF), somatic copy number mutations, tumor gene expression and germline VCFs from 49 individuals. RCC pilot analysis conducted on genomic data specific to RCC cohort",
      "connectiontype": "Clinical OMOP CDM data for cohort F connected to ATLAS and PLP apps (VPODC). Primary Oncology, epidemiology and Genomics connected to secure workspaces in VPODC/MC2DP",
      "status": "[Established - Real Data]",
      "patients": "23 patients"
    }
  ]
  type BgColorsType = {[key: string]: string};
  const bgColors: BgColorsType = {
    '[Established - Real Data]': 'bg-green-100',
    '[Established - Real Data Pending]': 'bg-orange-100',
    '[Synthetic Data]': 'bg-orange-100',
    '[Connection Pending]': 'bg-red-100',
    '[Data Pending]': 'bg-red-100',
    '[No Clinical Data, Imaging Data Received - Connection Pending]': 'bg-red-100',
  };
  const rows = elements.map((element, index) => (
    <Table.Tr key={index}>
      <Table.Td>{element.source}</Table.Td>
      <Table.Td>{element.cohortStudy}</Table.Td>
      <Table.Td>{element.datatype}</Table.Td>
      <Table.Td>
        <Spoiler 
          maxHeight={90}
          showLabel="Show full description"
          hideLabel="Hide full description"
          className='w-96'
        >
          {element.description}
        </Spoiler>
      </Table.Td>
      <Table.Td>{element.connectiontype}</Table.Td>
      <Table.Td className={bgColors[element.status]}>{element.status}</Table.Td>
      <Table.Td>{element.patients}</Table.Td>
    </Table.Tr>
  ));
  return (
    <NavPageLayout
      {...{ headerProps, footerProps }}
      headerMetadata={{
        title: 'Data Connections',
        content: 'Data Connections',
        key: 'gen3-DataConnections-page',
      }}
    >
      <div className="w-full m-10">
        <Title order={1}>Data Connections</Title>
        <Table 
          striped
          tabularNums
          withTableBorder
          withColumnBorders
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Source</Table.Th>
              <Table.Th>Cohort / Study</Table.Th>
              <Table.Th>Data Type</Table.Th>
              <Table.Th>Data Description</Table.Th>
              <Table.Th>Connection Type</Table.Th>
              <Table.Th>Connection Status</Table.Th>
              <Table.Th># Patients Available/Expected</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <p><Mark className={bgColors['[Established - Real Data]']}>Green color</Mark>: connection established with real data</p>
      </div>
    </NavPageLayout>
  );
};

// TODO: replace this with a custom getServerSideProps function
export const getServerSideProps: GetServerSideProps<
  NavPageLayoutProps
> = async () => {
  return {
    props: {
      ...(await getNavPageLayoutPropsFromConfig()),
    },
  };
};

export default StatsPage;