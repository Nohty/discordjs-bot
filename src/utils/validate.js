module.exports.checkCommandModule = (cmdName, cmdModule) => {
    if(!cmdModule.hasOwnProperty('run'))
        throw new Error(`${cmdName} command module does not have property 'run'`);
    if(!cmdModule.hasOwnProperty('description'))
        throw new Error(`${cmdName} command module does not have property 'description`);
    if(!cmdModule.hasOwnProperty('aliases'))
        throw new Error(`${cmdNamd} command module does not have property 'aliases'`);
    return true;
}
