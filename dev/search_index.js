var documenterSearchIndex = {"docs":
[{"location":"api/#API","page":"API","title":"API","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"Modules = [SurrogatesBase]","category":"page"},{"location":"api/#SurrogatesBase.AbstractDeterministicSurrogate","page":"API","title":"SurrogatesBase.AbstractDeterministicSurrogate","text":"abstract type AbstractDeterministicSurrogate <: Function end\n\nAn abstract type for deterministic surrogates.\n\n(s::AbstractDeterministicSurrogate)(xs)\n\nSubtypes of AbstractDeterministicSurrogate are callable with a Vector of points xs. The result is a Vector of evaluations of the surrogate at points xs, corresponding to approximations of the underlying function at points xs respectively.\n\nExamples\n\n```jldoctest  julia> struct ZeroSurrogate <: AbstractDeterministicSurrogate end\n\njulia> (::ZeroSurrogate)(xs) = 0\n\njulia> s = ZeroSurrogate()  ZeroSurrogate()\n\njulia> s([4]) == 0  true  ```\n\n\n\n\n\n","category":"type"},{"location":"api/#SurrogatesBase.AbstractStochasticSurrogate","page":"API","title":"SurrogatesBase.AbstractStochasticSurrogate","text":"abstract type AbstractStochasticSurrogate end\n\nAn abstract type for stochastic surrogates.\n\nSee also finite_posterior.\n\n\n\n\n\n","category":"type"},{"location":"api/#SurrogatesBase.finite_posterior","page":"API","title":"SurrogatesBase.finite_posterior","text":"finite_posterior(s::AbstractStochasticSurrogate, xs::AbstractVector)\n\nReturn a posterior distribution at points xs.\n\nAn AbstractStochasticSurrogate might implement some or all of the following methods on the returned object:\n\nmean(finite_posterior(s,xs)) returns a Vector of posterior means at xs\nvar(finite_posterior(s,xs)) returns a Vector of posterior variances at xs\nmean_and_var(finite_posterior(s,xs)) returns a Tuple consisting of a Vector\n\nof posterior means and a Vector of posterior variances at xs\n\nrand(finite_posterior(s,xs)) returns a Vector, which is a sample from the joint\n\nposterior at points xs\n\nUse mean(finite_posterior(s, eachslice(X, dims = 2))) if X is a matrix.\n\n\n\n\n\n","category":"function"},{"location":"api/#SurrogatesBase.hyperparameters","page":"API","title":"SurrogatesBase.hyperparameters","text":"hyperparameters(s)\n\nReturns current values of hyperparameters.\n\nSee also update_hyperparameters!.\n\n\n\n\n\n","category":"function"},{"location":"api/#SurrogatesBase.parameters","page":"API","title":"SurrogatesBase.parameters","text":"parameters(s)\n\nReturns current values of parameters used in surrogate s.\n\n\n\n\n\n","category":"function"},{"location":"api/#SurrogatesBase.update!","page":"API","title":"SurrogatesBase.update!","text":"update!(s, new_xs::AbstractVector, new_ys::AbstractVector)\n\nInclude data new_ys at points new_xs into the surrogate s, i.e., refit the surrogate s to incorporate new data points.\n\nIf the surrogate s is a deterministic surrogate, the new_ys correspond to function evaluations, if s is a stochastic surrogate, the new_ys are samples from a conditional probability distribution.\n\nUse update!(s, eachslice(X, dims = 2), new_ys) if X is a matrix.\n\n\n\n\n\n","category":"function"},{"location":"api/#SurrogatesBase.update_hyperparameters!","page":"API","title":"SurrogatesBase.update_hyperparameters!","text":"update_hyperparameters!(s, prior)\n\nUpdate the hyperparameters of the surrogate s by performing hyperparameter optimization using the information in prior. After changing hyperparameters of s, fit s to past data.\n\nSee also hyperparameters.\n\n\n\n\n\n","category":"function"},{"location":"interface/#The-SurrogateBase-Interface","page":"The SurrogateBase Interface","title":"The SurrogateBase Interface","text":"","category":"section"},{"location":"interface/#Deterministic-Surrogates","page":"The SurrogateBase Interface","title":"Deterministic Surrogates","text":"","category":"section"},{"location":"interface/","page":"The SurrogateBase Interface","title":"The SurrogateBase Interface","text":"Deterministic surrogates s are subtypes of SurrogatesBase.AbstractDeterministicSurrogate,  which is a subtype of Function.","category":"page"},{"location":"interface/#Required-methods","page":"The SurrogateBase Interface","title":"Required methods","text":"","category":"section"},{"location":"interface/","page":"The SurrogateBase Interface","title":"The SurrogateBase Interface","text":"The method update!(s, xs, ys) must be implemented and the surrogate must be callable s(xs), where xs is a Vector of input points and ys is a Vector of corresponding evaluations.","category":"page"},{"location":"interface/","page":"The SurrogateBase Interface","title":"The SurrogateBase Interface","text":"Calling update!(s, xs, ys) refits the surrogate s to include evaluations ys at points xs. The result of s(xs) is a Vector of evaluations of the surrogate at points xs, corresponding to approximations of the underlying function at points xs respectively.","category":"page"},{"location":"interface/","page":"The SurrogateBase Interface","title":"The SurrogateBase Interface","text":"For single points x and y, call these methods via update!(s, [x], [y]) and s([x]).","category":"page"},{"location":"interface/#Optional-methods","page":"The SurrogateBase Interface","title":"Optional methods","text":"","category":"section"},{"location":"interface/","page":"The SurrogateBase Interface","title":"The SurrogateBase Interface","text":"If the surrogate s wants to expose current parameter values, the method parameters(s) must be implemented.","category":"page"},{"location":"interface/","page":"The SurrogateBase Interface","title":"The SurrogateBase Interface","text":"If the surrogate s has tunable hyperparameters, the methods update_hyperparameters!(s, prior) and hyperparameters(s) must be implemented.","category":"page"},{"location":"interface/","page":"The SurrogateBase Interface","title":"The SurrogateBase Interface","text":"Calling update_hyperparameters!(s, prior) updates the hyperparameters of the surrogate s by performing hyperparameter optimization using the information in prior. After the hyperparameters of s are updated, s is fit to past evaluations. Calling hyperparameters(s) returns current values of hyperparameters.","category":"page"},{"location":"interface/#Example","page":"The SurrogateBase Interface","title":"Example","text":"","category":"section"},{"location":"interface/","page":"The SurrogateBase Interface","title":"The SurrogateBase Interface","text":"using SurrogatesBase\n\nstruct RBF{T} <: AbstractDeterministicSurrogate\n    scale::T\n    centers::Vector{T}\n    weights::Vector{T}\nend\n\n(rbf::RBF)(xs) = [rbf.weights' * exp.(-rbf.scale * (x .- rbf.centers).^2)\n                  for x in xs]\n\nfunction SurrogatesBase.update!(rbf::RBF, xs, ys)\n    # Refit the surrogate by updating rbf.weights to include new \n    # evaluations ys at points xs\n    return rbf\nend\n\nSurrogatesBase.parameters(rbf::RBF) = rbf.centers, rbf.weights\n\nSurrogatesBase.hyperparameters(rbf::RBF) = rbf.scale\n\nfunction SurrogatesBase.update_hyperparameters!(rbf::RBF, prior)\n    # update rbf.scale and fit the surrogate by adapting rbf.weights\n    return rbf\nend","category":"page"},{"location":"interface/#Stochastic-Surrogates","page":"The SurrogateBase Interface","title":"Stochastic Surrogates","text":"","category":"section"},{"location":"interface/","page":"The SurrogateBase Interface","title":"The SurrogateBase Interface","text":"Stochastic surrogates s are subtypes of SurrogatesBase.AbstractStochasticSurrogate.","category":"page"},{"location":"interface/#Required-methods-2","page":"The SurrogateBase Interface","title":"Required methods","text":"","category":"section"},{"location":"interface/","page":"The SurrogateBase Interface","title":"The SurrogateBase Interface","text":"The methods update!(s, xs, ys) and finite_posterior(s, xs) must be implemented, where xs is a Vector of input points and ys is a Vector of corresponding observed samples.","category":"page"},{"location":"interface/","page":"The SurrogateBase Interface","title":"The SurrogateBase Interface","text":"Calling update!(s, xs, ys) refits the surrogate s to include observations ys at points xs.","category":"page"},{"location":"interface/","page":"The SurrogateBase Interface","title":"The SurrogateBase Interface","text":"For single points x and y, call the update!(s, xs, ys) via update!(s, [x], [y]).","category":"page"},{"location":"interface/","page":"The SurrogateBase Interface","title":"The SurrogateBase Interface","text":"Calling finite_posterior(s, xs) returns an object that provides methods for  working with the finite  dimensional posterior distribution at points xs. The following methods might be supported:","category":"page"},{"location":"interface/","page":"The SurrogateBase Interface","title":"The SurrogateBase Interface","text":"mean(finite_posterior(s,xs)) returns a Vector of posterior means at xs\nvar(finite_posterior(s,xs)) returns a Vector of posterior variances at xs\nmean_and_var(finite_posterior(s,xs)) returns a Tuple consisting of a Vector","category":"page"},{"location":"interface/","page":"The SurrogateBase Interface","title":"The SurrogateBase Interface","text":"of posterior means and a Vector of posterior variances at xs","category":"page"},{"location":"interface/","page":"The SurrogateBase Interface","title":"The SurrogateBase Interface","text":"rand(finite_posterior(s,xs)) returns a Vector, which is a sample from the joint posterior at points xs","category":"page"},{"location":"interface/#Optional-methods-2","page":"The SurrogateBase Interface","title":"Optional methods","text":"","category":"section"},{"location":"interface/","page":"The SurrogateBase Interface","title":"The SurrogateBase Interface","text":"If the surrogate s wants to expose current parameter values, the method parameters(s) must be implemented.","category":"page"},{"location":"interface/","page":"The SurrogateBase Interface","title":"The SurrogateBase Interface","text":"If the surrogate s has tunable hyper-parameters, the methods update_hyperparameters!(s, prior) and hyperparameters(s) must be implemented.","category":"page"},{"location":"interface/","page":"The SurrogateBase Interface","title":"The SurrogateBase Interface","text":"Calling update_hyperparameters!(s, prior) updates the hyperparameters of the surrogate s by performing hyperparameter optimization using the information in prior. After the hyperparameters of s are updated, s is fit to past samples. Calling hyperparameters(s) returns current values of hyperparameters.","category":"page"},{"location":"interface/#Example-2","page":"The SurrogateBase Interface","title":"Example","text":"","category":"section"},{"location":"interface/","page":"The SurrogateBase Interface","title":"The SurrogateBase Interface","text":"using SurrogatesBase\n\nmutable struct GaussianProcessSurrogate{D, R, GP, H <: NamedTuple} <: AbstractStochasticSurrogate\n    xs::Vector{D}\n    ys::Vector{R}\n    gp_process::GP\n    hyperparameters::H\nend\n\nfunction SurrogatesBase.update!(g::GaussianProcessSurrogate, new_xs, new_ys)\n    append!(g.xs, new_xs)\n    append!(g.ys, new_ys)\n    # condition the prior `g.gp_process` on new data to obtain a posterior\n    # update g.gp_process to the posterior process\n    return g\nend\n\nfunction SurrogatesBase.finite_posterior(g::GaussianProcessSurrogate, xs)\n    # Return a finite dimensional projection of g.gp_process at points xs.\n    # The returned object GP_finite supports methods mean(GP_finite) and\n    # var(GP_finite) for obtaining the vector of means and variances at points xs.\nend\n\nSurrogatesBase.hyperparameters(g::GaussianProcessSurrogate) = g.hyperparameters\n\nfunction SurrogatesBase.update_hyperparameters!(g::GaussianProcessSurrogate, prior)\n    # Use prior on hyperparameters, e.g., parameters uniformly distributed \n    # between an upper and lower bound, to perform hyperparameter optimization.\n    # Set g.hyperparameters to the improved hyperparameters.\n    # Fit a Gaussian process that uses the updated hyperparameters to past\n    # samples and save it in g.gp_process.\n    return g\nend","category":"page"},{"location":"#SurrogatesBase.jl:-A-Common-Interface-for-Surrogate-Libraries","page":"Home","title":"SurrogatesBase.jl: A Common Interface for Surrogate Libraries","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"API for deterministic and stochastic surrogates.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Given data ((x_1 y_1) ldots (x_N y_N)) obtained by evaluating a function y_i = f(x_i) or sampling from a conditional probability density p_YX(Y = y_iX = x_i), a deterministic surrogate is a function s(x) (e.g. a radial basis function interpolator) that uses the data to approximate f or some statistic of p_YX (e.g. the mean), whereas a stochastic surrogate is a stochastic process (e.g. a Gaussian process approximation) that uses the data to approximate f or p_YX and quantify the uncertainty of the approximation.","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"To install SurrogatesBase.jl, use the Julia package manager:","category":"page"},{"location":"","page":"Home","title":"Home","text":"using Pkg\nPkg.add(\"SurrogatesBase\")","category":"page"},{"location":"#Contributing","page":"Home","title":"Contributing","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Please refer to the SciML ColPrac: Contributor's Guide on Collaborative Practices for Community Packages for guidance on PRs, issues, and other matters relating to contributing to SciML.\nSee the SciML Style Guide for common coding practices and other style decisions.\nThere are a few community forums:\nThe #diffeq-bridged and #sciml-bridged channels in the Julia Slack\nThe #diffeq-bridged and #sciml-bridged channels in the Julia Zulip\nOn the Julia Discourse forums\nSee also SciML Community page","category":"page"},{"location":"#Reproducibility","page":"Home","title":"Reproducibility","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"<details><summary>The documentation of this SciML package was built using these direct dependencies,</summary>","category":"page"},{"location":"","page":"Home","title":"Home","text":"using Pkg # hide\nPkg.status() # hide","category":"page"},{"location":"","page":"Home","title":"Home","text":"</details>","category":"page"},{"location":"","page":"Home","title":"Home","text":"<details><summary>and using this machine and Julia version.</summary>","category":"page"},{"location":"","page":"Home","title":"Home","text":"using InteractiveUtils # hide\nversioninfo() # hide","category":"page"},{"location":"","page":"Home","title":"Home","text":"</details>","category":"page"},{"location":"","page":"Home","title":"Home","text":"<details><summary>A more complete overview of all dependencies and their versions is also provided.</summary>","category":"page"},{"location":"","page":"Home","title":"Home","text":"using Pkg # hide\nPkg.status(; mode = PKGMODE_MANIFEST) # hide","category":"page"},{"location":"","page":"Home","title":"Home","text":"</details>","category":"page"},{"location":"","page":"Home","title":"Home","text":"using TOML\nusing Markdown\nversion = TOML.parse(read(\"../../Project.toml\", String))[\"version\"]\nname = TOML.parse(read(\"../../Project.toml\", String))[\"name\"]\nlink_manifest = \"https://github.com/SciML/\" * name * \".jl/tree/gh-pages/v\" * version *\n                \"/assets/Manifest.toml\"\nlink_project = \"https://github.com/SciML/\" * name * \".jl/tree/gh-pages/v\" * version *\n               \"/assets/Project.toml\"\nMarkdown.parse(\"\"\"You can also download the\n[manifest]($link_manifest)\nfile and the\n[project]($link_project)\nfile.\n\"\"\")","category":"page"}]
}
