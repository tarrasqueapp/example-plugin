import { Campaign, tarrasque } from '@tarrasque/sdk';

import './style.css';

let campaign: Campaign;

async function main() {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div>
      <p>
        Hi ${campaign?.name}
      </p>
    </div>
  `;
}

// Render on load
tarrasque.onReady(async () => {
  campaign = await tarrasque.campaign.get();
  main();
});

// Re-render when the current campaign changes
tarrasque.campaign.onChange((updatedCampaign) => {
  campaign = updatedCampaign;
  main();
});

// Re-render when the component is hot reloaded in development
if (import.meta.hot) {
  import.meta.hot.accept();
  campaign = await tarrasque.campaign.get();
  main();
}
