/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LocationsMap } from './components/LocationsMap';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <LocationsMap />
    </div>
  );
}
