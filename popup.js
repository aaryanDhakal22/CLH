const loginSequence = (USERNAME, PASSWORD, SECCODE) => {

    username = document.querySelector("#branding-username")
    password = document.querySelector("#branding-password")
    sub_btn = document.querySelector("#branding-sumbit-button")
    username.value = USERNAME
    password.value = PASSWORD
    sub_btn.click()
    setTimeout(() => {
        console.log("Trying to click ")
        let opt_sec_que = document.querySelector("a[aria-label='Use Security Questions']");
        opt_sec_que.click()

        let sec_que = document.querySelector("#securityAnswer")
        sec_que.value = SECCODE
        sec_que.dispatchEvent(new Event("input", { bubbles: true }));
        sec_que.dispatchEvent(new Event("change", { bubbles: true }));

        let next_btn = document.querySelector("button[aria-label='Next']");
        next_btn.removeAttribute("disabled")
        next_btn.click()
        setTimeout(() => {
            console.log("Trying to click ")
            opt_sec_que = document.querySelector("a[aria-label='Use Security Questions']");
            opt_sec_que.click()

            sec_que = document.querySelector("#securityAnswer")
            sec_que.value = SECCODE
            sec_que.dispatchEvent(new Event("input", { bubbles: true }));
            sec_que.dispatchEvent(new Event("change", { bubbles: true }));

            next_btn = document.querySelector("button[aria-label='Submit']");
            next_btn.removeAttribute("disabled")
            next_btn.click()
        }, 2000)
    }, 7000)


}
const exec = async () => {
    console.log("Executing script")
    // Fetch stored credentials using await
    const USERNAME = (await chrome.storage.local.get(["USERNAME"]))["USERNAME"];
    const PASSWORD = (await chrome.storage.local.get(["PASSWORD"]))["PASSWORD"];
    const SECCODE = (await chrome.storage.local.get(["SECCODE"]))["SECCODE"];

    console.log(USERNAME, PASSWORD, SECCODE)

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) return;

        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: loginSequence,
            args: [USERNAME, PASSWORD, SECCODE] // Correctly passing arguments
        });
    });
}

const saveData = (username, password, security) => {
    console.log('Saving settings');
    console.log(username.value, password.value, security.value)
    chrome.storage.local.set({ 'USERNAME': username.value, 'PASSWORD': password.value, 'SECCODE': security.value }, function () {
        console.log('Settings saved');
    });
}

const fillData = async (username, password, security) => {
    const USERNAME = (await chrome.storage.local.get(["USERNAME"]))["USERNAME"];
    const PASSWORD = (await chrome.storage.local.get(["PASSWORD"]))["PASSWORD"];
    const SECCODE = (await chrome.storage.local.get(["SECCODE"]))["SECCODE"];
    if (USERNAME && PASSWORD && SECCODE) {
        username.value = USERNAME
        password.value = PASSWORD
        security.value = SECCODE
    }
}

username = document.querySelector("#username")
password = document.querySelector("#password")
security = document.querySelector("#sec")
run_btn = document.querySelector("#runBtn")
save_btn = document.querySelector("#saveBtn")

fillData(username, password, security)
run_btn.addEventListener("click", exec)
save_btn.addEventListener("click", () => { return saveData(username, password, security) })