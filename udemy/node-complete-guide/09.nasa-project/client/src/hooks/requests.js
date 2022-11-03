async function httpGetPlanets() {
  const res = await fetch('http://localhost:8000/planets');
  return await res.json();
}

async function httpGetLaunches() {
  const res = await fetch('http://localhost:8000/launches');
  return await res.json();
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch('http://localhost:8000/launches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(launch),
    });
  } catch (error) {
    return {
      ok: false,
    };
  }
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
