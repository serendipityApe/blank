const includeJobs = ['前端','web'];
const excludeJobs = [];
const expectedSalary = '20k';
const msg = '您好，我是23界毕业生，有大厂实习经验，可以看下我的简历吗?'

const APP_NAME = 'BOSS直聘';
const BOSS_JOB_CARD_VIEW = 'cl_card_container';
const BTN_CHAT = 'btn_chat';

auto.waitFor();

const viewLists = id(BOSS_JOB_CARD_VIEW).find();

function myReturn(){
    const returnBtn = id('iv_back').findOne();
    if(returnBtn && returnBtn.exist()){
        returnBtn.click();
    }
}
console.log(text("前端").findOnce())
console.log(viewLists.empty())
viewLists.click()

