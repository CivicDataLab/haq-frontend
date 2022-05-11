import DataCatalogue from 'components/icons/DataCatalogue';
import PieChart from 'components/icons/PieChart';
import DataStory from 'components/icons/DataStory';
import BudgetSummary from 'components/icons/BudgetSummary';

export const dataList = {
    dataset:{
        title: 'All Datasets',
        content:
          'An overview of the budget allocated and the expenditure incurred under Education related accounting heads by the Government of Uttar Pradesh for in the across various fiscal years.',
        logo: <DataCatalogue />,
     },
    scheme:{
        title: 'Scheme',
        content:
          'An overview of the budget allocated and the expenditure incurred under Education related accounting heads by the Government of Uttar Pradesh for in the across various fiscal years.',
        logo: <PieChart />,
    },
    budget:{
        title: 'Budget Summary',
        content:
          'An overview of the budget allocated and the expenditure incurred under Education related accounting heads by the Government of Uttar Pradesh for in the across various fiscal years.',
        logo: <BudgetSummary />,
    },
    story:{
        title: 'Data Stories',
        content:
          'An overview of the budget allocated and the expenditure incurred under Education related accounting heads by the Government of Uttar Pradesh for in the across various fiscal years.',
        logo: <DataStory />,
    }
};