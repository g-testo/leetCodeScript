import fetch from "node-fetch";

const getLeetCodeStats = (accountNameArr) => {
    let queries = "{";
    for (let i = 0; i < accountNameArr.length; i++) {
        queries += `
        userRecentSubmissions${i}: recentSubmissionList(username: "${accountNameArr[i]}") {
            title
            titleSlug
            timestamp
            statusDisplay
            lang
            __typename    
        }
        userStats${i}: matchedUser(username: "${accountNameArr[i]}") {
            username
            submitStats: submitStatsGlobal {
                acSubmissionNum {
                    difficulty
                    count
                    submissions
                }
            }
        }`;
    }
    queries += "}";

    console.log(queries);

    fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: queries,
        }),
    })
        .then((res) => res.json())
        .then((response) => {
            console.log(response);
            // let { data } = response;
            // let recentProblems = data.recentSubmissionList;
            // let stats = data.matchedUser.submitStats.acSubmissionNum;

            // console.log(recentProblems);
            // console.log(stats);
        });
};

getLeetCodeStats(["brightcodenyc", "AlekiChrome", "esayh", "coreencooper"]);
