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
            let { data } = response;
            let details = Array(accountNameArr.length)
                .fill(0)
                .map((_, i) => {
                    let acceptedProblems = data["userRecentSubmissions" + i].filter(
                        (sub) => sub.statusDisplay === "Accepted"
                    );
                    return {
                        stats: data["userStats" + i],
                        subs: acceptedProblems,
                    };
                });
            console.log(details);
        });
};

getLeetCodeStats(["brightcodenyc", "AlekiChrome", "esayh", "coreencooper"]);
