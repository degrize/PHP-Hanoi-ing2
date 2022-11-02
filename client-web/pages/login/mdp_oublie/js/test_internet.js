const wrapper = document.querySelector('.wrapper'),
    toast = wrapper.querySelector('.toast'),
    wifiIcon = wrapper.querySelector('.icon'),
    title = wrapper.querySelector('span'),
    subTitle = wrapper.querySelector('p'),
    closeIcon = wrapper.querySelector('.close-icon');

window.onload = ()=>{ // once window loaded
    function ajax() {
        let xhr = new XMLHttpRequest(); // creating new xml object
        xhr.open("GET", "https://jsonplaceholder.typicode.com/posts", true); // sending get request to this URL
        xhr.onload = (event)=>{ //once ajax loaded
            // if ajax status is equal to 200 or less than 300 that mean user is
            // getting data/response from that provided URL.
            // or user is online so he/she is getting response or 200 status code
            if (xhr.status == 200 && xhr.status < 300) {
                online();
                closeIcon.onclick = ()=> {
                    wrapper.classList.add('hide');
                };
                setTimeout(()=> {
                    wrapper.classList.add('hide');
                }, 5000); // after 5s toast will hidden automatically
            } else { // user isn't online or may getting something other error
                offline();
            }
        }
        xhr.onerror = (event)=>{ // if the passed URL is incorrect or returning 404 or other error
            offline();
        }
        xhr.send();
    }

    function offline() { //creating offline function
        wrapper.classList.remove('hide');
        toast.classList.add('offline');
        title.innerText = "Vous êtes hors ligne";
        subTitle.innerText = "Oups! Internet est déconnecté";
        wifiIcon.innerHTML = '<img src="../images/wi-fi_off_48px.png" style="object-fit: cover; filter: invert(1); transform: scale(0.8) "></img>';

    }
    function online() { //creating offline function
        toast.classList.remove('offline');
        title.innerText = "Vous êtes en ligne";
        subTitle.innerText = "Internet est connecté";
        wifiIcon.innerHTML = '<i class="fa fa-wifi"></i>';

    }

    // Let pu this ajax call inside setInterval function so we can call it after evry 100ms
    // so we don't to refresh the page to see the update status
    ajax(); //calling ajax function
    setInterval(()=>{
        ajax(); //calling ajax function
    },100)


}
