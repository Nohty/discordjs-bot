module.exports = {
    run: async(client, message, args) =>{
        if(!message.member.hasPermission('BAN_MEMBERS?')){
            message.channel.send("You don't have permission to use that command.");
        } else{
            try{
                return;
            } catch(err){
                console.log(err);
            }
        }
    }
}