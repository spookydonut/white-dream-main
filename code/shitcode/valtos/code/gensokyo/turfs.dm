/turf/open/floor/grass/gensgrass
	gender = FEMALE
	name = "трава"
	icon = 'code/shitcode/valtos/icons/gensokyo/turfs.dmi'
	icon_state = "grass1"
	footstep = FOOTSTEP_GRASS
	barefootstep = FOOTSTEP_GRASS
	clawfootstep = FOOTSTEP_GRASS
	heavyfootstep = FOOTSTEP_GENERIC_HEAVY
	initial_gas_mix = OPENTURF_DEFAULT_ATMOS
	var/nospawn = FALSE

/turf/open/floor/grass/gensgrass/dirty
	gender = FEMALE
	name = "грязь"
	icon = 'code/shitcode/valtos/icons/gensokyo/turfs.dmi'
	icon_state = "dirt"
	nospawn = TRUE

/turf/open/floor/grass/gensgrass/Initialize()
	. = ..()
	if(nospawn)
		return
	icon_state = "grass[rand(1, 3)]"
	SpawnMonster(get_turf(src))
	if(prob(5))
		name = "грязь"
		icon_state = "dirt"
		return
	if (prob(70))
		var/obj/structure/flora/ausbushes/rospilovo/F = pick(subtypesof(/obj/structure/flora/ausbushes/rospilovo))
		new F(get_turf(src))
		if (prob(20))
			new /obj/structure/flora/tree/gensokyo(get_turf(src))
	var/C = pick("c", "d", "e", "f")
	color = "#[C][C][C][C][C][C]"

/turf/open/floor/grass/gensgrass/proc/SpawnMonster(turf/T)
	if(prob(30))
		if(istype(loc, /area/mine/explored/gensokyo) || !istype(loc, /area/mine/unexplored/gensokyo))
			return
		var/randumb = /mob/living/simple_animal/hostile/asteroid/mineral_crab
		for(var/thing in urange(7, T)) //prevents mob clumps
			if(!ishostile(thing) && !istype(thing, /obj/structure/spawner))
				continue
			if(ispath(randumb, /mob/living/simple_animal/hostile/asteroid) || istype(thing, /mob/living/simple_animal/hostile/asteroid))
				return
		new randumb(T)


/turf/closed/mineral/strong/gensokyo
	turf_type = /turf/open/floor/grass/gensgrass/dirty
	baseturfs = /turf/open/floor/grass/gensgrass/dirty
	initial_gas_mix = OPENTURF_DEFAULT_ATMOS

/turf/closed/mineral/random/high_chance/gensokyo
	turf_type = /turf/open/floor/grass/gensgrass/dirty
	baseturfs = /turf/open/floor/grass/gensgrass/dirty
	initial_gas_mix = OPENTURF_DEFAULT_ATMOS
