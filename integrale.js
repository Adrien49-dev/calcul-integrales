function calculer() {
	var fonc = document.getElementById("f(x)").value;
	fonc = eval('var f = function func(x) { return ' + fonc + '; }');
	console.log(fonc);
	var x1 = parseFloat(document.getElementById("x1").value);
	var x2 = parseFloat(document.getElementById("x2").value);
	var itv = parseInt(document.getElementById("itv").options[document.getElementById("itv").selectedIndex].value);

	var y1 = f(x1);
	document.getElementById("y1").value = y1;
	var y2 = f(x2);
	document.getElementById("y2").value = y2;

	var r = integrale_rectangle(f, x1, x2, itv, false);
	document.getElementById("meth1").value = r;
	
	r = integrale_trapeze(f, x1, x2, itv);
	console.log(r);
	document.getElementById("meth2").value = r;
	
	r = integrale_simpson(f, x1, x2, itv);
	document.getElementById("meth3").value = r;
}

function integrale_rectangle(f, x1, x2, n, b) {
	var a = new Array();
	for (var i=0; i<=n; ++i) a[i] = x1 + i*(x2-x1)/n;
	var r = 0.0;
	if (b)
		// intégrale rectangles inférieurs
		for (var i=0; i<n; ++i) r += Math.abs(f(a[i]));
	else
		// intégrale rectangles supérieurs
		for (var i=1; i<=n; ++i) r += Math.abs(f(a[i]));
		
	return r * (x2-x1) / n;
}

function integrale_trapeze(f, x1, x2, n) {
	return (integrale_rectangle(f,x1,x2,n,false) + integrale_rectangle(f,x1,x2,n,true)) / 2;
}

function integrale_simpson(f,x1, x2, n) {
	var a = new Array();
	for (var i=0; i<=n; ++i) a[i] = x1 + i*(x2-x1)/n;
	var r = 0.0;

	for (var i=0; i<n; ++i)
		r += (a[i+1]-a[i])/6*(f(a[i])+4*f((a[i]+a[i+1])/2)+f(a[i+1]));
		
	return r;
}

function effacer() {
	document.getElementById("y1").value = "";
	document.getElementById("y2").value = "";
	document.getElementById("meth1").value = "";
	document.getElementById("meth2").value = "";
	document.getElementById("meth3").value = "";
}