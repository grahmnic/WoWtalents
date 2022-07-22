import environment from 'config';

export default ({}) => {
    try {
        console.log("Fetching environment variables.");
    } catch (error) {
        console.warn("Environment variables need to be set.");
        process.exit(1);
    }

    if (!environment.get("infrastructure")) {
        console.warn("Configuration found but environment variables aren't set correctly.");
        process.exit(1);
    }

    return environment;
}