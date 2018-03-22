let imgIp='http://localhost:80/pic';
if(process.env.NODE_ENV==='production'){
	imgIp='/pic';
}
export default imgIp;