import fetch from "node-fetch";

const getLeetCodeStats = (accountName) => {
    let query = `{ matchedUser(username: "${accountName}") {
            username
            submitStats: submitStatsGlobal {
            acSubmissionNum {
            difficulty
            count
            submissions
            }
        }
    }}`;

    fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query,
        }),
    })
        .then((res) => res.json())
        .then((response) => {
            let stats = response.data.matchedUser.submitStats.acSubmissionNum;
            console.log(stats);
        });
};

getLeetCodeStats("brightcodenyc");
